REPORTER ?= spec

test:
	./node_modules/.bin/mocha \
		--compilers js:babel/register \
		--ui bdd \
		--reporter $(REPORTER) \
		--recursive

.PHONY: test
