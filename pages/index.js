import { MongoClient } from "mongodb";
import Head from "next/head"
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUP = [
    {
        id: "m1",
        title: "Fishing",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
        address: "The big lake",
        description: "Fishin time "
    },
    {
        id: "m2",
        title: "Ice cream meetup",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.W8apTKARTqVhmLzMCisNmAHaEs%26pid%3DApi&f=1",
        address: "Ben + jerrys",
        description: "YUM "
    },
    {
        id: "m3",
        title: "Driving school",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6KGPsHRkqkebepv0JKXwIAHaE8%26pid%3DApi&f=1",
        address: "Vic roads",
        description: "I need my licence "
    },
    {
        id: "m4",
        title: "Boat",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.NO9b4begR7atKn_UUylIUQHaE6%26pid%3DApi&f=1",
        address: "Boat",
        description: "big boat"
    },
]


function HomePage(props){
   return(
    <>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="React Tutorial"/>
        </Head>
        <MeetupList meetups={props.meetups} />
    </>
   );
}

// runs for every request
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }
// }

//FASTER, regenerates only every x seconds
export async function getStaticProps(){
    const client = await MongoClient.connect("mongodb+srv://curtis:TEST@cluster0.yqyy5fy.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    ///Fetch data from API, never reaches client PC 
    return{
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
};

export default HomePage;