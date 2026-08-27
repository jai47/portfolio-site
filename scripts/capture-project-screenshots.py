#!/usr/bin/env python3
"""Capture live project screenshots via Chrome CDP (one Chrome session per site)."""

from __future__ import annotations

import base64
import json
import socket
import subprocess
import time
import urllib.request
from pathlib import Path

import websocket

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "projects" / "screenshots"
PROFILE_BASE = Path("/tmp/chrome-shot-profiles")

SITES = [
    ("bikebuddies", "https://bikesbuddiesandmore.com/"),
    ("box-factory", "https://boxf.47.run"),
    ("aakaar", "https://vm-aakaar.in"),
    ("hrms", "https://hrms-sts3.vercel.app"),
    ("xcubit", "https://xcubit.vercel.app/"),
    ("vastav", "https://www.vastavintellect.com"),
]


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def get_json(url: str):
    with urllib.request.urlopen(url, timeout=2) as r:
        return json.load(r)


def put_json(url: str):
    req = urllib.request.Request(url, method="PUT")
    with urllib.request.urlopen(req, timeout=5) as r:
        return json.load(r)


def wait_cdp(port: int, tries: int = 60) -> None:
    for _ in range(tries):
        try:
            get_json(f"http://127.0.0.1:{port}/json/version")
            return
        except Exception:
            time.sleep(0.2)
    raise RuntimeError("CDP not ready")


class Cdp:
    def __init__(self, ws_url: str):
        self.ws = websocket.create_connection(ws_url, timeout=90)
        self._id = 0

    def send(self, method: str, params: dict | None = None, timeout: float = 60.0):
        self._id += 1
        mid = self._id
        self.ws.settimeout(timeout)
        self.ws.send(json.dumps({"id": mid, "method": method, "params": params or {}}))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                if "error" in msg:
                    raise RuntimeError(json.dumps(msg["error"]))
                return msg.get("result", {})

    def close(self):
        try:
            self.ws.close()
        except Exception:
            pass


def capture_one(name: str, url: str) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    profile = PROFILE_BASE / name
    profile.mkdir(parents=True, exist_ok=True)

    port = free_port()
    chrome = subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={port}",
            "--remote-allow-origins=*",
            f"--user-data-dir={profile}",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--no-first-run",
            "--no-default-browser-check",
            "--window-size=1440,900",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    try:
        wait_cdp(port)
        target = put_json(f"http://127.0.0.1:{port}/json/new?about:blank")
        cdp = Cdp(target["webSocketDebuggerUrl"])

        cdp.send("Page.enable")
        cdp.send("Network.enable")
        cdp.send(
            "Emulation.setDeviceMetricsOverride",
            {
                "width": 1440,
                "height": 900,
                "deviceScaleFactor": 2,
                "mobile": False,
            },
        )

        cdp.send("Page.navigate", {"url": url})
        time.sleep(6.0)
        try:
            cdp.send(
                "Runtime.evaluate",
                {
                    "expression": """
(() => {
  const texts = /accept|agree|got it|ok|dismiss/i;
  document.querySelectorAll('button,a').forEach((el) => {
    if (texts.test(el.textContent || '')) { try { el.click(); } catch {} }
  });
})()
""",
                },
            )
        except Exception:
            pass
        time.sleep(1.0)

        # Prefer viewport screenshot (smaller / more card-friendly)
        shot = cdp.send(
            "Page.captureScreenshot",
            {"format": "png", "fromSurface": True},
        )
        file = OUT_DIR / f"{name}.png"
        file.write_bytes(base64.b64decode(shot["data"]))
        cdp.close()
        return file
    finally:
        chrome.terminate()
        try:
            chrome.wait(timeout=4)
        except Exception:
            chrome.kill()


def main() -> None:
    PROFILE_BASE.mkdir(parents=True, exist_ok=True)
    for name, url in SITES:
        print(f"Capturing {name} -> {url}")
        try:
            file = capture_one(name, url)
            print(f"  OK {file} ({file.stat().st_size} bytes)")
        except Exception as e:
            print(f"  FAIL {name}: {e}")


if __name__ == "__main__":
    main()
