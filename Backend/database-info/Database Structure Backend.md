Users DB
    Journal DB
    Belonging Groups List
    Total Videos Done
    Words Said
    Minutes Recording
    Tournament Rank History
    Badge
    User ID
    Requested Products (for rewards)
    Owned Products (for rewards)
    Dark/White Mode Bool (for frontend config)
    Profile Picture
    Phone
    Email
    First Name
    Last Name
    Calls With User DB (this tracking data)
    Experience (as in XP for the game)
    Adchievements DB (the database of adchievements for the profile tab)
    Streak
    Sparks (in game unit)
    API Keys
        Fathom API Key
        Instagram API
        Zernio API
    User Rank
    Chat DB (for clan tab, on friends sub-tab)
        Chat
            Receiver User ID
            Messages DB
            Message
            Sent At
            Seen At
            Files Attached
    Canvases DB (on home and funnel view)
        Canvas DB
            Canvas Versions DB -- snapshots of the full workflow graph over time
                Canvas Version
                    ID
                    Parent Version ID -- same DAG pattern as Evolution DB, for the workflow itself
                    Label (e.g. "Added Writer Node", "Removed Researcher")
                    Nodes Snapshot (IDs + pinned versions at time of save)
                    Connections Snapshot
                    Created At
            Nodes
                Heading
                Description
                Button Text
                Node ID
                Input Nodes
                Output Nodes
                Cordinates
                Outer Shape SVG
                Inner Shape SVG
                Node Type (Types: Agent Node, Database Node, Tracker Node)
                Node Format (templated versions of different nodes types, for example, for the agent node, there might be a node format that is "Scriptwritter", and for the Database Node, a "content manager", I will give you a list soon...)
                Pinned Version ID -- which Evolution DB entry this node is currently running (per-client pin)
                Nodes DBs (timelines, feed views, metrics, temporal data, etc.)
                    If node type: Agent Node:
                        Timeline DB
                            Activity
                            ID
                            Description
                            Subagent (if any)
                            Progress Towards Completion
                            Start Time
                            End Time (if any, yet)
                            Sub Activities
                        Evolution DB
                            Interation
                            ID
                            Version
                            Name
                            Description
                            Changes
                            Input Version (version gives birth to another one, like a tree branch, [GIT])
                            Output Version (version gives birth to another one, like a tree branch, [GIT])
                            Is Current (Boolean) -- marks the version the workflow is currently pinned to
                            Is Dead Branch (Boolean) -- abandoned experimental versions still kept for history
                            Config JSON -- the actual agent configuration: system prompt, tools, parameters
                    If node type: Database Node
                        (Personalized DB, it will have a lot of node formats)
                    If node type: Tracker Node
                        Layout DB (this will be a personalized database with the layout of the tracker, metrics, data, etc.)
                        (Besides the data on the layout, we might have API keys and stuff like that...)
Info DB
    Other DBs
Assets DB
    Animated
    Static
        Streak
            Yellow
            Yellow-Orange
            Orange
            Orange-Blue
            Blue
        Menus
            Bottom Menu
            Top Navbar (Home)
            Top Navbar (Clan)
            Top Navbar (Account)
        Sparks
            Flat Spark
            3d Spark
Rewards Store DB (for gems)
    Catalog
        Name
        PNG
        Description
        Color
        Rewards DB
            Color
            Name
            PNG
            Descrition
            Content
            Price (in sparks)
            User IDs Who Requested
Events
    Event Type DB
        Event Type
            Event Type Name
            Event Type SVG
            Event Color
    Events DB (events for the calendar tab)
        Event
            ID
            Name
            Description
            Type (calls, for now that's it... gotten from Event Type DB)
            Users (users who have the event in their calendars -- type @everyone for everyone @group:GROUP for a specific group of people subtituting GROUP by the said group ID. Groups are defined in the "Belonging Gorups List")
            Content (markdown allowing URLs and other stuff)
            Event Creator
            Start Time
            End Time
            All-Day Flag (boolean)
            Timezone
            Recurrence Rule (if any)
            Recurrence End (if any)
            Recurrence Count (if any)
            Exception Dates (if any)
            Created At
            Location (virtual (100% of times, for now))
            Importance (if very important, all notification types for this event are turned on, if medium important, you'll be warned 1 day before, if unimportant, you'll ot be warned)
Posts DB (for chat sub-tab on clan tab)
    Post
        Files
        Views
        Pin Status
        Poster's ID
        Heading
        Contents
        Reactions
            Likes
            (more might be added later)
        Comments DB
            Comment
            Views
            Parent Comment (if any)
            Commenter's ID
            Contents
            Reactions
                Likes 
                (we could add more later)
            Child Comments (if any)
Tournament
    Rank Badges
        1st Badge
        2nd Badge
        3rd Badge
    Tiers DB (obsidian, bronze)
        Tier
          Tier Name
          Badge
    Tournaments DB
        Tournament
            Start Time (timecode)
            End Time (timecode)
            Participant IDs DB
            Tier Relation
            1st Place Reward
            2nd Place Reward
            3rd Place Reward
            Demoted Percentage
            Promoted Percentage
Quest DB
    Quest
        Quest Name (Apprtove Script Batches, Record Videos, Give Feedback/Answer Questions)
        Description
        Objective of Quest
        Assigned Users & Status
        Quest Type
        If Quest Type is Approve Script Batches: (we might create more quest specific data, specific quests require specific functionaly)
            Video ID List -- you chose the 7 videos in scripting stage closest to being posted
        If Quest Type is Record Videos:
            Video ID List -- you chose the 7 videos in the filming stage closest to being posted
            Printed Bools List (to track how many )
        If Quest Type is Answer Questions:
            Form ID -- you will pick a form from the form DB
            Answer List
Form DB
    Form
        Form Name
        Form Use Case
        Form Description
        Question DB (5 questions max)
            Question
                Question to Ask
                Description of Question
Adchievements DB
    Adchievement
        SVG DB
          SVG
            Level (LV1, LV2, etc... there could be an svg for the adchievement per level, that's why we do this)
            File
        Adchievement Title
        Single Action Adchievement (Boolean) -- (if the adchivement is a specific action done one, usually works by tracking booleans on the user profile.)
        Adchivement Condition DB (Code -- this is a while loop, for example: 10 Recordings (LV 1), 100 Recordings (LV2) -- etc..)
        Description 
        (adchivement progress is tracked with data from their profile, for the recordings for example, it's a recordings metric, and if there was an adchivement "Press Record" -- where you have to record once, then it checks if it's more then 1.)
Interaction DB -- A registry of interactions user has done with the app
    User Who Did Interaction (ID)

App Versions DB -- tracks platform-level releases of Doubtonator itself
    App Version
        ID
        Semver (e.g. "2.1.0")
        Release Notes
        Released At

Subagents DB -- the index/tool definitions that agents can call (subagents are indexes, not peer AIs)
    Subagent
        ID
        Type (Types: RAG Index, API Tool, Function)
        Name
        Description
        Subagent Versions DB -- version history for each subagent, same DAG pattern as Evolution DB
            Subagent Version
                ID
                Parent Version ID
                Config JSON -- index source, API endpoint, function definition, parameters
                Label (e.g. "v1.0", "v1.1-updated-source")
                Changes
                Is Current (Boolean)
                Created At

[NOTE:] -- I need to add data points for data tracking