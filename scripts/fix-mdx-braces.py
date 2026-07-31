from __future__ import annotations

import re
from pathlib import Path

POSTS = Path(__file__).resolve().parents[1] / "content" / "posts" / "tistory"
INLINE_CODE = re.compile(r"(`[^`]*`)")


def escape_mdx_braces(text: str) -> str:
    lines = text.splitlines(True)
    out: list[str] = []
    in_code = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            out.append(line)
            continue
        if in_code:
            out.append(line)
            continue
        parts = INLINE_CODE.split(line)
        for i, part in enumerate(parts):
            if i % 2 == 0:
                parts[i] = part.replace("{", "\\{").replace("}", "\\}")
        out.append("".join(parts))
    return "".join(out)


def main() -> None:
    fixed = 0
    for path in sorted(POSTS.glob("*.mdx")):
        raw = path.read_text(encoding="utf-8")
        if not raw.startswith("---"):
            continue
        end = raw.find("\n---", 3)
        if end < 0:
            continue
        fm = raw[: end + 4]
        body = raw[end + 4 :]
        new_body = escape_mdx_braces(body)
        if new_body != body:
            path.write_text(fm + new_body, encoding="utf-8")
            fixed += 1
            print(f"fixed {path.name}")
    print(f"total fixed {fixed}")


if __name__ == "__main__":
    main()
