# Social App API
This repository holds the source code for the back end of Social App Client side-project. The back end was created using serverless and uses AWS lambda and API Gateway to access dynamoDB resources.

API calls currently exist for:
- Creating a post
- Getting a single post
- Getting all posts
- Getting a user
- Liking a post
- Unliking a post
- Signup a user

Cognito is used for authentication and signup, therefore only the signup API call is currently used to add a user to a users database, therefore allowing other users to get the user info.