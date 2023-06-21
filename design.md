The app is comprised of one parent component and three children, Movies, Characters, and Quotes. I chose to use MUI to get up and running quickly. Each child component handles its own data fetching and loading states. If one would fail the others should still be able to render.

Improvements that could be made would be:

- store the responses from the API in localStorage or in a separate backend service
- abstract the fetching logic out and decouple it from the Datagrid components
- give the ability to search for the character by the character id on the Quotes table
- improve the styles
- flesh out the tests
