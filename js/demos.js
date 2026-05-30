// ─── LESSON 2 DEMO: GRADE CALCULATOR ───
function runGrade() {
  const raw = document.getElementById('grade-score').value;
  const el  = document.getElementById('grade-result');
  const score = parseInt(raw, 10);

  if (isNaN(score) || score < 0 || score > 100) {
    el.textContent = '⚠ Enter a number between 0 and 100.';
    return;
  }

  let grade, msg, branch;
  if (score >= 90) {
    grade = 'A'; msg = 'Excellent!';
    branch = 'if (score >= 90)  ✓ FIRES';
  } else if (score >= 80) {
    grade = 'B'; msg = 'Good job!';
    branch = 'else if (score >= 80)  ✓ FIRES';
  } else if (score >= 70) {
    grade = 'C'; msg = 'Passing';
    branch = 'else if (score >= 70)  ✓ FIRES';
  } else if (score >= 60) {
    grade = 'D'; msg = 'Needs improvement';
    branch = 'else if (score >= 60)  ✓ FIRES';
  } else {
    grade = 'F'; msg = 'Please see your teacher';
    branch = 'else  ✓ FIRES  (no condition matched above)';
  }

  el.textContent =
    `Score: ${score}\n` +
    `\nCondition path:\n` +
    `  if (score >= 90)          ${score >= 90 ? '✓ FIRES → Grade A' : '✗ skip'}\n` +
    `  else if (score >= 80)     ${score >= 80 && score < 90 ? '✓ FIRES → Grade B' : (score >= 80 ? '(already matched above)' : '✗ skip')}\n` +
    `  else if (score >= 70)     ${score >= 70 && score < 80 ? '✓ FIRES → Grade C' : (score >= 70 ? '(already matched above)' : '✗ skip')}\n` +
    `  else if (score >= 60)     ${score >= 60 && score < 70 ? '✓ FIRES → Grade D' : (score >= 60 ? '(already matched above)' : '✗ skip')}\n` +
    `  else                      ${score < 60 ? '✓ FIRES → Grade F' : '(already matched above)'}\n` +
    `\nResult: Grade ${grade} — ${msg}`;
}

// ─── LESSON 3 DEMO: LOOP TRACER ───
// Traces a for (i = from; i <= to; i += step) loop one iteration at a time,
// showing each condition check, and warns about infinite / zero-run loops.
function runLoopTrace() {
  const from = parseInt(document.getElementById('loop-from').value, 10);
  const to   = parseInt(document.getElementById('loop-to').value, 10);
  const step = parseInt(document.getElementById('loop-step').value, 10);
  const el   = document.getElementById('loop-result');

  if (isNaN(from) || isNaN(to) || isNaN(step)) {
    el.textContent = '⚠ Enter whole numbers for From, To, and Step.';
    return;
  }

  const header = `for (int i = ${from}; i <= ${to}; i += ${step})`;

  // Infinite loop: a non-positive step can never push i past `to` when it
  // starts at or below it — the condition stays true forever.
  if (step <= 0 && from <= to) {
    el.textContent =
      `${header}\n\n` +
      `⚠ INFINITE LOOP!\n` +
      `Step is ${step}, so i never grows past ${to}.\n` +
      `The condition i <= ${to} stays true forever — this loop never ends.\n\n` +
      `Fix: use a step of 1 or more so i keeps climbing toward ${to}.`;
    return;
  }

  const lines = [header, ''];
  const printed = [];
  let i = from, iterations = 0;
  const CAP = 50;

  while (i <= to && iterations < CAP) {
    lines.push(`  i = ${i}\t(${i} <= ${to}? ✓)  → print ${i}`);
    printed.push(i);
    iterations++;
    i += step;
  }

  if (iterations >= CAP) {
    lines.push(`  … stopped after ${CAP} iterations (demo limit)`);
  } else {
    // The check that finally fails and ends the loop.
    lines.push(`  i = ${i}\t(${i} <= ${to}? ✗)  → stop`);
  }

  lines.push('');
  if (iterations === 0) {
    lines.push(`Loop ran 0 times — ${from} is already past ${to}, so the body never runs.`);
  } else {
    lines.push(`Loop ran ${iterations} time${iterations === 1 ? '' : 's'}. Printed: ${printed.join(' ')}`);
  }

  el.textContent = lines.join('\n');
}

// ─── LESSON 4 DEMO: ARRAY INSPECTOR ───
// Parses a comma-separated list into an array, then shows the index/value
// layout plus the sum/average/max/min patterns, and demonstrates a safe
// vs out-of-bounds index access.
function runArrayDemo() {
  const raw    = document.getElementById('arr-values').value;
  const idxRaw = document.getElementById('arr-index').value;
  const el     = document.getElementById('arr-result');

  const parts = raw.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const arr = parts.map(s => parseInt(s, 10));
  if (arr.length === 0 || arr.some(n => isNaN(n))) {
    el.textContent = '⚠ Enter whole numbers separated by commas, e.g. 5, 12, 8.';
    return;
  }

  let sum = 0, max = arr[0], min = arr[0];
  for (const n of arr) {
    sum += n;
    if (n > max) max = n;
    if (n < min) min = n;
  }
  const avg = Math.round((sum / arr.length) * 100) / 100;

  const width = Math.max(...arr.map(n => String(n).length), 2);
  const pad = s => String(s).padStart(width);
  const idxRow = 'Index:  ' + arr.map((_, i) => pad(i)).join('  ');
  const valRow = 'Value:  ' + arr.map(n => pad(n)).join('  ');

  const idx = parseInt(idxRaw, 10);
  let access;
  if (isNaN(idx)) {
    access = 'Enter an index to access an element.';
  } else if (idx >= 0 && idx < arr.length) {
    access = `arr[${idx}] = ${arr[idx]}   ✓ valid`;
  } else {
    access = `arr[${idx}] → ArrayIndexOutOfBoundsException!\n              Valid indexes are 0 to ${arr.length - 1} only.`;
  }

  el.textContent =
    idxRow + '\n' + valRow + '\n\n' +
    `length  = ${arr.length}   (valid indexes 0 to ${arr.length - 1})\n` +
    `sum     = ${sum}\n` +
    `average = ${avg}\n` +
    `max     = ${max}\n` +
    `min     = ${min}\n\n` +
    `Access:  ${access}`;
}

// ─── LESSON 5 DEMO: METHOD MACHINE ───
// Shows the input -> process -> output shape of a method: takes two
// parameters, runs the chosen operation, and hands back a return value.
function runMethodDemo() {
  const a  = parseInt(document.getElementById('m-a').value, 10);
  const b  = parseInt(document.getElementById('m-b').value, 10);
  const op = document.getElementById('m-op').value;
  const el = document.getElementById('m-result');

  if (isNaN(a) || isNaN(b)) {
    el.textContent = '⚠ Enter two whole numbers for a and b.';
    return;
  }

  let name, body, result;
  if (op === 'subtract') {
    name = 'subtract'; body = 'return a - b;'; result = a - b;
  } else if (op === 'multiply') {
    name = 'multiply'; body = 'return a * b;'; result = a * b;
  } else if (op === 'max') {
    name = 'max'; body = 'return (a > b) ? a : b;'; result = Math.max(a, b);
  } else {
    name = 'add'; body = 'return a + b;'; result = a + b;
  }

  el.textContent =
    `// The method:\n` +
    `static int ${name}(int a, int b) {\n` +
    `    ${body}\n` +
    `}\n\n` +
    `You called:   ${name}(${a}, ${b})\n` +
    `Inside:       a = ${a}, b = ${b}\n` +
    `Returned:     ${result}\n\n` +
    `int answer = ${name}(${a}, ${b});   // answer is now ${result}`;
}

// ─── LESSON 6 DEMO: CALL-STACK TRACER ───
// Visualises factorial(n) as a stack of plates: first the calls WIND UP
// (each pushed onto the stack, paused, waiting on a smaller call) until the
// base case is hit, then they UNWIND (each returns, building the answer).
function runRecursionDemo() {
  const n  = parseInt(document.getElementById('rec-n').value, 10);
  const el = document.getElementById('rec-result');

  if (isNaN(n) || n < 0) {
    el.textContent = '⚠ Enter a whole number that is 0 or more.';
    return;
  }
  if (n > 8) {
    el.textContent = '⚠ Keep it to 8 or less so the stack stays easy to read (8! is already 40320).';
    return;
  }

  const lines = [];

  // Phase 1: winding up — push each call until we reach the base case.
  lines.push('WINDING UP — each call is pushed and waits:');
  lines.push('');
  for (let k = n; k >= 1; k--) {
    const indent = '  '.repeat(n - k);
    lines.push(`${indent}factorial(${k}) = ${k} * factorial(${k - 1})   ⏸ waiting`);
  }
  const baseIndent = '  '.repeat(n);
  lines.push(`${baseIndent}factorial(0) = 1   ✓ BASE CASE — stop here`);

  // Phase 2: unwinding — each waiting call now multiplies and returns.
  lines.push('');
  lines.push('UNWINDING — each call finishes and returns:');
  lines.push('');
  let result = 1;            // factorial(0)
  for (let k = 1; k <= n; k++) {
    const prev = result;     // factorial(k-1)
    result = k * prev;
    const indent = '  '.repeat(n - k);
    lines.push(`${indent}factorial(${k}) = ${k} * ${prev} = ${result}`);
  }

  lines.push('');
  lines.push(`Answer: factorial(${n}) = ${result}`);

  el.textContent = lines.join('\n');
}

// ─── LESSON 7 DEMO: OBJECT BUILDER ───
// Constructs a Dog object from the class "blueprint", shows the object's own
// state (its fields), then runs a chosen instance method — illustrating that
// each object holds its own data and that methods can change that state.
function runObjectDemo() {
  const name = (document.getElementById('obj-name').value || '').trim();
  const age  = parseInt(document.getElementById('obj-age').value, 10);
  const op   = document.getElementById('obj-op').value;
  const el   = document.getElementById('obj-result');

  if (!name) { el.textContent = '⚠ Give the dog a name first.'; return; }
  if (isNaN(age) || age < 0) { el.textContent = '⚠ Enter an age of 0 or more.'; return; }

  let call, output, shownAge = age, ageNote = '';
  if (op === 'haveBirthday') {
    call = 'd.haveBirthday();';
    shownAge = age + 1;
    ageNote = '   // the method changed it!';
    output = name + ' is now ' + shownAge + '.';
  } else if (op === 'describe') {
    call = 'd.describe();';
    output = name + ' is ' + age + ' years old.';
  } else {
    call = 'd.bark();';
    output = name + ' says: Woof!';
  }

  el.textContent =
    '// Build one real object from the Dog blueprint:\n' +
    'Dog d = new Dog("' + name + '", ' + age + ');\n\n' +
    "This object's own state:\n" +
    '    d.name = "' + name + '"\n' +
    '    d.age  = ' + shownAge + ageNote + '\n\n' +
    'You called:  ' + call + '\n' +
    'Output:      ' + output;
}

// ─── LESSON 8 DEMO: POLYMORPHISM EXPLORER ───
// Stores a child object in an Animal-typed variable and "calls" makeSound().
// Shows the is-a relationship and that the OVERRIDDEN version is chosen by the
// real object's type, not the variable's type.
function runPolyDemo() {
  const type = document.getElementById('poly-type').value;
  const name = (document.getElementById('poly-name').value || '').trim();
  const el   = document.getElementById('poly-result');

  if (!name) { el.textContent = '⚠ Give the animal a name first.'; return; }

  // Each subclass's overridden makeSound() behavior.
  const sounds = {
    Dog:    name + ' says: Woof!',
    Cat:    name + ' says: Meow!',
    Cow:    name + ' says: Moo!',
    Animal: name + ' makes a sound.'
  };
  const overrides = type !== 'Animal';

  el.textContent =
    'Animal a = new ' + type + '("' + name + '");\n\n' +
    'Is-a check:   a ' + type + ' IS-A Animal? ' + (type === 'Animal' ? 'yes (it IS Animal)' : 'yes ✓') + '\n' +
    'Variable type: Animal\n' +
    'Real object:   ' + type + '\n\n' +
    'a.makeSound();\n' +
    '   → ' + sounds[type] + '\n\n' +
    (overrides
      ? '// Java ran ' + type + "'s OVERRIDDEN makeSound(),\n// chosen by the real object — not the Animal variable type."
      : '// No override here, so the base Animal version runs.');
}

// ─── DEMO 1: TYPE CASTING EXPLORER ───
function runCast() {
  const v = parseFloat(document.getElementById('cast-val').value);
  const t = document.getElementById('cast-to').value;
  const el = document.getElementById('cast-result');
  if (isNaN(v)) { el.textContent = '⚠ Enter a number first.'; return; }
  let out = '';
  if (t === 'int-from-double') {
    const trunc = Math.trunc(v);
    out = `double value = ${v};\nint result = (int) value;\n\n// Result: ${trunc}\n// Note: decimal part is dropped (not rounded!)`;
  } else if (t === 'double-from-int') {
    const i = Math.trunc(v);
    out = `int value = ${i};\ndouble result = value;  // widening — automatic\n\n// Result: ${i}.0\n// Widening is always safe — no data loss`;
  } else if (t === 'char-from-int') {
    const code = Math.trunc(v);
    const ch = (code >= 0 && code <= 65535) ? String.fromCharCode(code) : '?';
    out = `int value = ${code};\nchar result = (char) value;\n\n// Result: '${ch}'\n// Unicode code point ${code} maps to character '${ch}'`;
  } else if (t === 'int-from-char') {
    const code = Math.trunc(v);
    const ch = String.fromCharCode(code % 65536);
    out = `char value = '${ch}';\nint result = value;  // widening — char stores as number\n\n// Result: ${code}\n// '${ch}' has Unicode value ${code}`;
  } else {
    const a = Math.trunc(v), b = 3;
    out = `int a = ${a}, b = ${b};\n\nint intResult = a / b;              // ${Math.trunc(a/b)}\ndouble doubleResult = (double)a / b; // ${(a/b).toFixed(6).replace(/0+$/, '')}\n\n// Integer division truncates the decimal.\n// Cast one operand to double before dividing.`;
  }
  el.textContent = out;
}

// ─── DEMO 2: OPERATOR SANDBOX ───
function runOps() {
  const a = parseFloat(document.getElementById('op-a').value);
  const b = parseFloat(document.getElementById('op-b').value);
  const el = document.getElementById('ops-result');
  if (isNaN(a) || isNaN(b)) { el.textContent = '⚠ Enter two numbers.'; return; }
  const ai = Math.trunc(a), bi = Math.trunc(b);
  const lines = [
    `// a = ${ai}, b = ${bi}`,
    `a + b   = ${ai + bi}`,
    `a - b   = ${ai - bi}`,
    `a * b   = ${ai * bi}`,
    `a / b   = ${bi !== 0 ? Math.trunc(ai/bi) : 'ArithmeticException (÷ by 0)'}  ← integer division`,
    `a % b   = ${bi !== 0 ? ((ai % bi + bi) % bi) : 'ArithmeticException'}  ← remainder`,
    `(double)a / b = ${bi !== 0 ? (ai/bi).toFixed(4).replace(/\.?0+$/,'') : 'error'}  ← decimal division`,
    ``,
    `// Comparison`,
    `a == b  = ${ai === bi}`,
    `a != b  = ${ai !== bi}`,
    `a >  b  = ${ai > bi}`,
    `a >= b  = ${ai >= bi}`,
    ``,
    `// Post-increment`,
    `a++     prints ${ai}, then a becomes ${ai+1}`,
    `++a     a becomes ${ai+1}, then prints ${ai+1}`,
  ];
  el.textContent = lines.join('\n');
}

// ─── HINT TOGGLES ───
function toggleHint(id) {
  const box = document.getElementById(id);
  const btn = box.previousElementSibling;
  const visible = box.style.display === 'block';
  box.style.display = visible ? 'none' : 'block';
  btn.textContent = visible ? 'Show hint' : 'Hide hint';
}

// ─── QUIZ ───
function qa(btn, correct) {
  const item = btn.closest('.q-item');
  if (item.querySelector('.q-opt[disabled]')) return;
  item.querySelectorAll('.q-opt').forEach(b => b.disabled = true);
  const fb = item.querySelector('.q-fb');
  if (correct) {
    btn.classList.add('correct');
    fb.textContent = '✓ Correct!'; fb.style.color = '#34d399';
  } else {
    btn.classList.add('wrong');
    item.querySelectorAll('.q-opt').forEach(b => {
      if (b.onclick.toString().includes('true')) b.classList.add('correct');
    });
    fb.textContent = '✗ Not quite — correct answer highlighted.'; fb.style.color = '#f87171';
  }
}
