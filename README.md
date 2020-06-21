# Localize
## Inspiration
The geography of the whole has changed due to **COVID-19**. This has affected people from all stretches of life. Localize was inspired by a real-life incident which happened in the month of May. In India, due to such a large population, the government had to impose strict lockdown across all the states. This led to a major panic everywhere. The major issue was the availability of day to day items and how will people buy them from shops given the conditions of **social distancing**.
The social-distancing rules were as follows-
1. No travelling either by cars, bikes, trains or flights.
2. The stores were also not allowed to deliver items and neither were the third party professional delivery services allowed. This was done because, in one of the cases, the delivery person of a famous pizza serving food-chain was infected with COVID-19 in Delhi ([source](https://www.indiatoday.in/india/story/delhi-pizza-delivery-boy-tests-positive-for-coronavirus-1667501-2020-04-16)).
3. **6 feet** distancing is mandatory in public.
4. Curfew after 7 PM.
5. Shops can only open from 9 AM to 6:30 PM.

The shops came out with a plan which is as follows - 

`People will stand in circles outside the shop. These circles will be 6 feet apart.`

This solution had multiple issues. They are as follows-
1. Only 2 people were allowed at a time in the shop for shopping.
2. People still did shopping in a leisurely manner. In some cases, when I went for buying groceries, people in front of the line would shop for **45 minutes** and came out with just a few vegetables.
3. The temperature in India reaches more than **104°F** or **40°C**. People have to stand in line under the sun for an unknown amount of time.
4. People who get tired, usually sit near a tree with very less space between them (less than 6 feet) **violating the social distancing rule**.
5. **Police brutality** - There have been many [cases](https://www.newindianexpress.com/cities/chennai/2020/mar/26/chennai-cops-harass-beat-up-residents-stepping-out-to-buy-groceries-amid-covid-19-lockdown-2121908.html), where police went to extreme measures and beat up people who were just going to buy groceries. Some more sources are as follows-
  * [Cop suspended for beating women at ration shop in Noida](https://www.newindianexpress.com/nation/2020/may/16/covid-19-lockdown-cop-suspended-for-beating-women-at-ration-shop-in-noida-2144240.html)
  * [Indian man shopping for milk under curfew dies after alleged police beating](https://www.telegraph.co.uk/news/2020/03/26/indian-man-shopping-groceries-curfew-dies-police-beating/)
  * [India Doesn't Have a System To Make Sure People Are Out for the Right Reasons During the Lockdown](https://www.vice.com/en_in/article/3a8e9v/india-lockdown-police-beating-essential-shoppers-doctors)
  * [Delivery personnel beaten up by police as people struggle for essential goods](https://yourstory.com/2020/03/coronavirus-lockdown-essential-goods-delivery-police-harassment)
  * **And many more...**
6. The people who are most affected by this situation are-
  * Elderly people - In the local news, a **75-year-old** man had to stand under the sun, waiting for his turn to buy groceries for **2** days. On the **3rd** day, he fainted and had to be rushed to a hospital.
  * People with disability
  * People who were victims of the above-mentioned police brutality.

I went through the stats and as per the [source](https://napoleoncat.com/stats/messenger-users-in-india/2020/05), India has more than **280 million Facebook Messenger** users. This can be leveraged to create a **proper** and **reliable** system that eliminates this **chaos**.

## Requirement Analysis
* We need a **no contact** based system to remove this chaos. We are going for **QR code** based access.
* Talked to a few managers and owners of our local shops and grocery stores. They told that people usually shop for **15 to 20 minutes**. Apart from that, they just go through **offers** and look for anything **new**.
* Also, people usually come again to the shop after **3-7 day** after buying groceries.
* We need something with a low learning curve which can be taught to the users very easily.
* To keep the grocery shopping local to prevent travelling.
* To prevent police brutality by having a system which is can be shown to them saying "I am going to buy groceries."

## What it does
**Localize** is divided into **3** parts. They are as follows - 
* **Self-service** - Here the user can select the local stores in his area and select a timeslot accordingly. The path is as follows-

```
Enter your name -> Enter your approximate address -> Select the shops -> Select a time slot -> Download the QR Code -> Receive a token which is a backup for QR Code -> Visit that shop at the chosen timeslot -> Get the QR Code scanned -> Shop -> Bill -> Leave
```

  * Here, we have used the QR Code for no contact system. The time slots are from 9 AM to 6:30 PM divided into **15 minutes** slots. This allows **38** customers to shop in a day at a single shop/store. It has reduced the chaos by a very large extent and when asked by the police officials, a person can show the proof.

* **Need for volunteers** - Here the user can ask for help from nearby volunteers. This option is very helpful for people who can not physically go to the store for legit reasons like **old age**, **people with disabilities** or for **people with special needs**. The path is as follows-

```
Self-certification for COVID-19 -> Enter your name -> Enter your approximate address -> Enter items that you need (example - I need apples, oranges, flour and carrots) -> Select a time slot -> Click on "Notify Me" -> Wait for volunteer to accept order
```

  * Here, we have asked the people who need volunteers to self-certify that people have shown no COVID-19 symptoms in the past **14 days** and to be polite to the volunteers and treat them with respect. Here, the time slots have been increased to **1 hour** slots to prevent any pressure on the **volunteers** and to provide a smooth experience.
  * Also, the "Notify me" feature was added so that the people who need volunteers can contact with the volunteers and discuss the issue.

* **Be a volunteer** - Here the user can choose to help people in need by being a volunteer. The deliveries needed are shown in a sorted manner according to the distance. The path is as follows-

```
Self-certification for COVID-19 -> Enter your name -> Enter your phone number -> Enter your approximate address -> See delivery list along with time slots, items needed, name, address and distance -> Accept a delivery
```

  * After accepting the delivery, the user whos delivery got accepted will receive a notification to contact the volunteer.
  * **NOTE** - The volunteer will then go to **self-service** option and follow those steps.
  * You can not only go for groceries, but also for medicines and all other shops nearby.
  * You can also say **hello** to restart the bot. Apart from that, everything works on quick replies to make the process **easier** and **faster**.

## How I built it
This is my first try at creating a Facebook messenger chatbot. I tried to make it as simple and useful as possible with an idea that can be highly impactful at such times. The tech-stack and implementation choices are as follows-
* For hosting, we made use of **Heroku**.
* **Node.js** helped in fast development.
* **Draw.io** was used to visualize the different paths.
* **Google's Places API** was used for suggesting nearby places and calculating approximate distance.
* **Google's Geocoding and Reverse Geocoding API** was used to convert the addresses to calculate distance and nearby places.
* **MongoDB** as a database.
* **One Time Notification** was used.
* **Quick reply** was used.
* **wit.ai** for capturing names, addresses, items and phone numbers.
* **Webview** was used to display large contents like `deliveries` and `timeslots`.

After this, we had to set up the logic of the bot.
* First of all, I drew the path and performed requirement analysis for this issue. This helped me to divide the service into 3 parts - **Self-service**, **Need for volunteers** and **Be a volunteer**.
* The issue of creating a separate database for timeslots. This is accessed by the self-service database.
* Training and validating **wit.ai** for handling addresses. It required a lot of patience as some Indian names were not being processed accurately along with some locations. It had to be trained for items and phone numbers too. In some cases, it was taking `items` as `names`.

## Challenges I ran into
* Some of the challenges that I faced are mostly related to approval issues. Due to COVID-19, the approval is slow and hence I had to roll the bot out in **Development Mode** only and I have given access to `499418056 and stef.devpost.1`.
* Modifying the One Time Notification issue to Notify the user when their delivery has been accepted. The Facebook Messenger Documentation helped a lot.
* Displaying of large content on messenger was not feasible at all. So we had to experiment and finally decided to go with webview.
* The most important part is to **reset** the timeslots at 6:30 PM (IST) so that people can select shops again. Solved it by keeping a timer.

## Accomplishments that I'm proud of
* I was able to understand the issue and due to such a scalable and impactful platform like Facebook messenger, I was able to implement it.
* The future prospects of this bot and how it will help the **people** and the **business** excites me.

## What I learned
I learnt a lot of new things since it is my first try at messenger bot. I learnt about various things ranging from working with different APIs which are provided by Facebook, training wit.ai, experimenting with the `Graph API`, creating a fully functional messenger bot and tinkering with the APIs.

## What's next for Localize
* Talk and showcasing the bot to the managers and owners of local establishments.
* Talk with the local police force and discuss the acknowledgement of the project.
* Rolling the bot out publicly for usage.
* Spreading awareness about the bot so that people start to use it.
* Adding **private reply** feature after acceptance.
