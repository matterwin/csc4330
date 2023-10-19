# CSC4330 Mobile App -- SocialEyes

<b>FOR</b> hobby enthusiasts and event organizers <br/>
<b>WHO</b> seeks a seamless way to connect, explore, and engage with other hobbies and other people who share their passions and interests <br/>
<b>SocialEyes</b> is a location-based hobby/event discovery and social networking platform <br/>
<b>THAT</b> simplifies the process of finding, joining, and organizing hobby-related meetups and events <br/>
<b>UNLIKE</b> Facebook Groups or Reddit <br/>
<b>OUR</b> PRODUCT offers a unified, user-centric experience that prioritizes privacy and personalization, making hobby connections more accessible, enjoyable, and enriching for all users. <br/>

# Setup
Read the README's inside the frontend and the backend folders to get more information <b>after</b> switching to your branch

# Source control -- Git

Make sure to update main branch occasionally<br/>
Make sure you're in main branch
- git checkout main 
- git pull


# Performing changes

Perform code changes inside your branch
- git checkout <your_branch_name>


# How to push changes
- git add .
- git commit -m "Insert your commit message inside quotes"
- git push origin <current_branch_name>

Now once you do this, you are only updating your remote branch and not the main branch.</br>
To update the main branch, you'll have to go to the github repo online and create a pull request.</br>

Once you create a pull request, you will see the modifications that you want to push to main branch.</br>
There might be merge conflicts or not if you're lucky.

Good luck


# After successfully merging into main

After completing the merge request on the GitHub repo, you'll need to update your local main branch.
- git checkout main
- git pull

Then switch back to your branch via
- git checkout <your_branch_name>

and you're back to square one


# Helpful git commands

To see what branch you're on
- git branch

Undoing changes:</br>
Moves the branch pointer to a previous commit, preserving changes
- git reset --soft <commit>

Resets the branch pointer and discards all changes since the specified commit
- git reset --hard <commit>

