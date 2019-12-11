1. React specific routing issues:
	- Page is not opened when user clicks on a link
	- Users see links to the pages they don’t have access to
	- White screen when user opens a page
	- Losing unsaved form data after navigating out of the page
2. Hardly maintainable code, that ignores errors and changing which leads to errors: 
    - Hardcode and copypaste when navigating in code
		- Bugs because of the error in the name of the path
		- Changes in path require changes in many other places
	- Hardcode and copypaste when navigating in ui:
		- Bugs because of the error in the name of the path
		- Changes in path require changes in many other places
	- No validation of the link parameters:
		- Bugs due to passing invalid args in path (typo, the wrong type, not passing at all)
	- No standard approach to routing without changing the url:
 		- Opening some part of the page that is not accessible by url looks like a hack
		- Showing different views on the same page (url) and allowing users to navigate between them looks like a hack
	- No standard approach in restricting access to the page for a user by feature, role, version:
		- Duplication of the access validation in links and routes. 		
		- No standard way to show what should happen if user doesn’t have access.
		- No standard way to show different pages in the same url for different versions / roles / etc.
		- No standard way to hide a link to the page user doesn’t have access to.
	 - No page error handling
	 - No standard approach to run a callback before navigating user from one page to another:
		- for example: if user clicks on the link in main nav and we want to show some popup (“you have unsaved data…”)
 	- Lazy loading of the page requires too much code
