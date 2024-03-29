import fileinput
import re

# the instructions: r is a set of registers
def addr(r, a, b, c): r[c] = r[a] + r[b]
def addi(r, a, b, c): r[c] = r[a] + b
def mulr(r, a, b, c): r[c] = r[a] * r[b]
def muli(r, a, b, c): r[c] = r[a] * b
def banr(r, a, b, c): r[c] = r[a] & r[b]
def bani(r, a, b, c): r[c] = r[a] & b
def borr(r, a, b, c): r[c] = r[a] | r[b]
def bori(r, a, b, c): r[c] = r[a] | b
def setr(r, a, b, c): r[c] = r[a]
def seti(r, a, b, c): r[c] = a
def gtir(r, a, b, c): r[c] = int(a > r[b])
def gtri(r, a, b, c): r[c] = int(r[a] > b)
def gtrr(r, a, b, c): r[c] = int(r[a] > r[b])
def eqir(r, a, b, c): r[c] = int(a == r[b])
def eqri(r, a, b, c): r[c] = int(r[a] == b)
def eqrr(r, a, b, c): r[c] = int(r[a] == r[b])

functions = [
    addr, addi, mulr, muli, banr, bani, borr, bori,
    setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr,
]

# parse pulls out `opcode, A, B, C`, all integers
def parse(line):
    return list(map(int, re.findall(r'\d+', line)))

# behaves_like indicates how many functions match the observed behavior
# in the before and after registers when running the provided instruction
def behaves_like(instruction, before, after):
    count = 0
    for f in functions:
        r = list(before)
        f(r, *instruction[1:])
        if r == after:
            count += 1
    return count

# remove_candidates discards functions that do not match the observed behavior
def remove_candidates(instruction, before, after, candidates):
    for f in functions:
        r = list(before)
        f(r, *instruction[1:])
        if r != after:
            candidates[instruction[0]].discard(f)

lines = list(fileinput.input())

# part 1
count = 0
for line in lines:
    if 'Before' in line:
        before = parse(line)
    elif 'After' in line:
        after = parse(line)
        # count how many examples behave like 3 or more functions
        if behaves_like(instruction, before, after) >= 3:
            count += 1
    else:
        instruction = parse(line)
print(count)

# part 2A - determine which opcodes map to which functions
opcodes = {}
known = set()
# loop until we've identified all opcodes
while len(known) < len(functions):
    # remaining candidates are the set of all functions
    # minus the set of known functions
    candidates = {}
    for i in range(len(functions)):
        candidates[i] = set(functions) - set(known)
    for line in lines:
        if 'Before' in line:
            before = parse(line)
        elif 'After' in line:
            after = parse(line)
            remove_candidates(instruction, before, after, candidates)
        else:
            instruction = parse(line)
    # look for opcodes that only have one candidate function
    # add them to the `known` set
    for i in range(len(functions)):
        if len(candidates[i]) == 1:
            f = candidates[i].pop()
            opcodes[i] = f
            known.add(f)

# part 2B - execute the stored program
r = [0] * 4
i = max(i for i, x in enumerate(lines) if not x.strip()) + 1
for line in lines[i:]:
    op, a, b, c = parse(line)
    f = opcodes[op]
    f(r, a, b, c)
print(r[0])
