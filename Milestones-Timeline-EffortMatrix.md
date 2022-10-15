# Milestones
1. **Complete back-end**
Research both the Sentiment Analysis and Twitter APIs. Successfully hit the endpoints with mock data. Integrate the APIs together so that the results of the twitter API are evaluated by the Sentiment Analysis API. Store any necessary data.
   * Research viable APIs to use for obtaining twitter location data -Veronica
      * Decide which one to use and learn how to use it
   * Develop code that makes use of the API and stores the output data -Veronica
        * Figure out how best to store this data so it can act as an input for the sentiment analysis API
    * Research Sentiment Analysis APIs - Anna
        * Decide on the best option to use for our purposes. Evaluate based on price and information provided.
    * Develop code that pulls from the stored twitter data and uses the sentiment analysis API to determine the emotion associated. - Anna
        * Make use of the decided sentiment API to gain insight on the twitter data.
    * Research relevant statistics that users and businesses can use - Mario
        * Depending on whether user/business, create a structured feed that finds relevant information towards specified group of people


1. **Complete front-end**
Work on designing the Webapp UI. Add functional elements to the UI such as search and filtering results. Design a map to present data gathered from APIs. Once this step is done the backend work should be visible and interactive via the Webapp. 
    * Develop comparison landing page based of location - Mario
        * Research the possible implementation of a comparison feature depending on user selection
    * Design accessibility features for the webapp - Reed
        * Design functionality to make webapp features accessible to a wide variety of users
    * Develop functionality for customizable return outputs - Reed
        * Allow users to customize the results of their search and export the results in their desired format 
    * Design WebApp UI -Veronica
        * Decide how the UI should be formatted including how searches will be input
    * Design viable structured format for code - Mario
        * Create a well designed infrastructure to build the front and back end code
    * Design a front-end component to allow the user to specify a time frame. - Anna
        * Design and implement a front-end component that allows the user to set a specific time frame to retrieve the twitter data for.
    * Develop code to present output data on a map -Veronica
        * The code will use the data collected by the APIs and present them on a map

3. **Connect front and back-end** (Call API on search, show API data on the map)
Incorporate the results returned from the backend into a visual result shown to the users. Make sure results returned are relevant to search. 
    * Develop an algorithm for determining relevance of a tweet. - Anna
        * Investigate what percentage of likes/retweets qualifies a tweet as popular opinion and implement an algorithm to determine tweet weight.
    * Investigate best ways to present data gathered in a visual format - Veronica
        * Research different ways other applications present location and sentiment analysis in a visual format
    * Contribute to overall development of code - Mario
        * Implement desired features for the back-end and front-end of the application


1. **Publicly hosting the website**
Research the best option for hosting the website publicly and execute necessary steps. Ensure that all group members can access the hosted website without the application running locally. Set up CI/CD pipeline to ensure automatic public updates.
    * Host WebApp on the cloud so that it can be accessed publicly. - Anna
        * Determine the best way to host the WebApp (Azure, AWS, ect) and follow necessary steps to make it publicly accessible.

5. **Finished product**
Finishing touches on the project. Make sure all functionality is working as intended. Clean up any UI or backend feature bugs that have been overlooked.
    * Specify and evaluate unit tests to ensure product is working correctly - Reed
        * Evaluate each separate component and ensure we receive desired outputs with specified inputs 
    * Ensure mapping functionality is accurate in sentiment marker placement - Reed
        * Verify that sentiment markers that are created via the map cdn (for example mapbox) are placed in the corresponding locations 
    * Research public opinion for cross-reference validation - Reed
        * Validate the results of the sentiment analysis AI by cross-referencing general opinion of a subject from a sample of returned locations 
    * Troubleshoot possible bugs depending on project stage - Mario
        * Properly test the extent of the application to discover any relevant bugs


# Timeline

| Task              |   Start Date  |  Completion Date |
|-------------------|---------------|------------------|
Research viable APIs to use for obtaining twitter location data | 10/23/22 | 10/30/22
Research Sentiment Analysis APIs | 10/23/22 | 10/30/22
Investigate best ways to present data gathered in a visual format | 10/23/22 | 11/6/22
Research relevant statistics that users and businesses can use | 10/23/22 | 10/30/22
Develop code that pulls from the stored twitter data and uses the sentiment analysis API to determine the emotion associated. | 10/30/22 | 11/13/22
Develop code that makes use of the API and stores the output data | 10/30/22 | 11/13/22
Design viable structured format for code | 10/30/22 | 11/6/22
Specify unit tests to ensure product is working correctly | 10/30/22 | 11/13/22
Combine APIs | 11/13/22 | 12/1/22
**Complete back-end** | 10/23/22 | 1/1/23
Design WebApp UI | 10/30/22 | 1/1/23
Design a front-end component to allow the user to specify a time frame. | 1/1/23 | 1/8/23
Design accessibility features for the webapp | 1/1/23 | 1/15/23
Develop code to present output data on a map | 1/8/23 | 2/1/23
Develop functionality for customizable return outputs | 1/21/23 | 2/1/23
**Complete Front-end** | 10/23/22 | 2/1/23
Develop an algorithm for determining relevance of a tweet. | 2/1/23 | 2/22/23
Ensure mapping functionality is accurate in sentiment marker placement | 2/1/23 | 2/14/23
Contribute to overall development of code | 2/1/23 | 3/1/23
Develop comparison landing page based off location | 2/22/23 | 3/1/23
**Connect front and back end** | 2/1/23 | 3/1/23
Host WebApp on the cloud so that it can be accessed publicly. | 3/1/23 | 3/8/23
**Publicly host application** | 3/1/23 | 3/8/23
Research public opinion for cross-reference validation | 3/8/23 | 3/15/23
Troubleshoot possible bugs depending on project stage | 3/15/23 | 4/1/23
**Finished Product** | 3/8/23 | 4/1/23


# Effort Matrix

| Task | Anna | Veronica | Mario | Reed |
|------|------|----------|-------|------|
Research viable APIs to use for obtaining twitter location data | 10% | **80%** | 5% | 5% |
Develop code that makes use of the API and stores the output data | 20% | **60%** | 10% | 10% |
Design WebApp UI | 20% | 40% | 30% | 10%
Investigate best ways to present data gathered in a visual format | 5% | **60%** | 20% | 15% |
Develop code to present output data on a map | 20% | **40%** | 30% | 10% |
Research Sentiment Analysis APIs | **80%** | 10% | 5% | 5% |
Develop code that pulls from the stored twitter data and uses the sentiment analysis API to determine the emotion associated. | **60%** | 20% | 10% | 10% |
Develop an algorithm for determining relevance of a tweet. | **40%** | 20% | 20% | 20% |
Design a front-end component to allow the user to specify a time frame. | **50%** | 30% | 10% | 10% |
Host WebApp on the cloud so that it can be accessed publicly. | **75%**| 5% | 5% | 5% |
Specify unit tests to ensure product is working correctly | 20% | 20% | 20% | **40%** |
Ensure mapping functionality is accurate in sentiment marker placement | 15% |15% | 10% | **50%** |
Design accessibility features for the webapp | 5% | 5% | 10% | **80%** |
Research public opinion for cross-reference validation | 15% | 15% | 10% | **50%** |
Develop functionality for customizable return outputs | 10% | 10% | 20% | **60%** |
Design viable structured format for code | 10% | 15% | **60%** | 15% |
Troubleshoot possible bugs depending on project stage | 15% | 10% | **60%** | 15% |
Develop comparison landing page based off location | 5% | 5% | **80%** | 10% |
Research relevant statistics that users and businesses can use | 5% | 10% | **80%** | 5% |
Contribute to overall development of code | 10% | 15% | **60%** | 15% |






