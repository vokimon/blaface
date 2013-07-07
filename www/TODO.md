# BUGS

- Chrome crashes when changing the eyelids directly by js
	- Solved: fill='delete' insted of fill='freeze' for the animation
	- TODO: Report the bug
- Chrome does not implement animate.onrepeat event
	- Solved: Work around using timers
	- TODO: Report the bug
- Firefox just blinks one eye (Looks like a FF bug, Chrome just works)
	- The other eye is a 'use' element and should respond to changes on the original object.




