// Imports
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head"
import MeetupDetail from "../../components/meetups/MeetupDetail";
// CSS Styles

function MeetupDetails(props){

    return(
    <>
        <Head>
            <title>Meetups - {props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
        </Head>
        <MeetupDetail 
        image={props.meetupData.image} 
        title={props.meetupData.title} 
        address={props.meetupData.address}
        description={props.meetupData.description} />
    </>
    );
}

export async function getStaticPaths(){
    const client = await MongoClient.connect("mongodb+srv://curtis:TEST@cluster0.yqyy5fy.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    ///Find -> Filter by what items (blank is all), second is what field
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();

    //dynamicaly generate paths 
    //this is temp 
    return{
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))
        // paths: [
        //     {
        //         params: {
        //             meetupId: "m1",
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m2",
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m3",
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m4",
        //         }
        //     },
        // ]
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://curtis:TEST@cluster0.yqyy5fy.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
    client.close();

    // console.log(meetupId);
    return{
        props: {
            meetupData: {
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
                id: selectedMeetup._id.toString(),
            },
            // {
            //     image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.W8apTKARTqVhmLzMCisNmAHaEs%26pid%3DApi&f=1",
            //     title: "Meetup no 1",
            //     address: "123 Street", 
            //     description: "awesome time",
            // } 
        }
    }
}

export default MeetupDetails;