.PHONY: help install dev build lint format clean clean-all

# Default target: show help
help:
	@echo "Growthho E-commerce Platform Developer Shortcuts"
	@echo "================================================="
	@echo "Available commands:"
	@echo "  make install     - Install all monorepo dependencies"
	@echo "  make dev         - Start development servers for both apps"
	@echo "  make build       - Run production Next.js compilation/builds"
	@echo "  make lint        - Run static lint checks on the codebase"
	@echo "  make format      - Auto-clean unused imports & format code (Biome)"
	@echo "  make clean       - Clear Next.js compiler caches (.next)"
	@echo "  make clean-all   - Clear Next.js caches and delete all node_modules"

# Install dependencies
install:
	pnpm install

# Start development servers
dev:
	pnpm run dev

# Compile and build the monorepo
build:
	pnpm run build

# Run linter verification
lint:
	pnpm run lint

# Auto-format and auto-clean unused imports safely
format:
	npx biome check --write --unsafe .

# Clear Next.js build caches to solve compiler glitches
clean:
	rm -rf ecomm-admin/.next ecomm-starter/.next

# Deep-clean all dependencies and build caches
clean-all: clean
	rm -rf node_modules ecomm-admin/node_modules ecomm-starter/node_modules
