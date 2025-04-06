# iSchool Portal Submission

## External UI Components Used

1. **react-tabs**  
   - **Functionality**: Creates a tab button
   - **Implementation**:  
     - For react-tabs, I create a tab under degrees, where I seperate the Undegrad and Grad deegree
     - I also use this for the people section where I seperate the staff and falcuty 
   - **Source**: [react-tabs GitHub](https://github.com/reactjs/react-tabs)

2. **react-modal**  
   - **Functionality**: Displays popup   
   - **Implementation**:  
     - Whenever someone click on show details, instead of it slide down to show more, I though it would be more convinient with a pop up with the details information, it in your face hard to miss the details, easier to grab information was my intention 
   - **Source**: [react-modal GitHub](https://github.com/reactjs/react-modal)

3. **react-table**  
   - **Functionality**: Creates data tables  
   - **Implementation**:  
     - I use the tables for employment, more specific for the co-op table where it display name of coop, Employer, degree, city,and term
   - **Source**: [react-table GitHub](https://github.com/tannerlinsley/react-table)

## Above and Beyond Features

- **Dynamic Course**: Minors course will expand when you want to see more for said minors, this way user don't have to scroll tirelesly down
- **Smooth scrolling**: I make the nav to scroll for you, so click on where you want to see and it take you there
- **Loading**: Feedback during API data fetching, so it won't be blank while API grabbing data.