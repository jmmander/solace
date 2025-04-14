# DISCUSSION

Thanks for checking out my code!

This project is split across 6 different PRs, each branching off the previous one. I structured it this way to make the code easily testable and review-friendly. For running the application, I recommend using the `ensure-payloads-is-jsonb` branch as it contains all the changes and updates. I also recommend setting up your local the database as this was the experience I optimized for.

## Future Improvements

### Backend
- Add structured error responses with appropriate HTTP status codes
- Create an index for specialties to improve search performance
- Implement automated tests

### Frontend
- Add error boundires to ensure app doesn't crash
- Make the table responsive and mobile-friendly
- Enhance data fetching with ReactQuery or SSR
- Optimize api calls
- Refactor the table into its own component
- Add comprehensive frontend tests
- Ensure it meets accessibilty standards

### Features:
- Filtering and sorting in the table header
