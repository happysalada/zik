#!/usr/bin/env oil

proc dev() {
  pnpm run dev
}

proc update_deps() {
  pnpm up --interactive --latest
}

proc build() {
  pnpm run build
}

@ARGV