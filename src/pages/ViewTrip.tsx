import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase"; // Import Firebase setup
import { doc, getDoc } from "firebase/firestore";

const ViewTrip: React.FC = () => {
  const { docId } = useParams<{ docId: string }>(); // Retrieve docId from the URL
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (!docId) {
        setError("Invalid document ID.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "itineraries", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTripDetails(docSnap.data());
        } else {
          setError("Trip not found.");
        }
      } catch (err) {
        setError("Failed to fetch trip details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [docId]);

  if (loading) return <div>Loading trip details...</div>;
  if (error) return <div>Error: {error}</div>;

  const { destination, days, budget, people, itinerary, createdAt } = tripDetails;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trip to {destination}</h1>
      <p><strong>Duration:</strong> {days} days</p>
      <p><strong>Budget:</strong> {budget}</p>
      <p><strong>People:</strong> {people}</p>
      <p><strong>Created At:</strong> {new Date(createdAt?.seconds * 1000).toLocaleString()}</p>

      <h2 className="text-xl font-semibold mt-6">Itinerary:</h2>
      {itinerary && Array.isArray(itinerary) ? (
        <div>
          {itinerary.map((day: any, index: number) => (
            <div key={index} className="mb-4 border p-4 rounded shadow">
              <h3 className="font-bold">Day {index + 1}</h3>
              <div>
                <p><strong>Hotel:</strong></p>
                <ul>
                  <li><strong>Name:</strong> {day.hotelName}</li>
                  <li><strong>Price:</strong> {day.hotelPrice}</li>
                  <li><strong>Location:</strong> {day.hotelLocation}</li>
                  <li>
                    <strong>Image:</strong> <br />
                    <img src={day.hotelImage} alt={`${day.hotelName}`} className="max-w-md" />
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <p><strong>Places to Visit:</strong></p>
                {day.placesToVisit && day.placesToVisit.map((place: any, idx: number) => (
                  <ul key={idx}>
                    <li><strong>Name:</strong> {place.placeName}</li>
                    <li><strong>Description:</strong> {place.placeDescription}</li>
                    <li><strong>Location:</strong> {place.placeLocation}</li>
                    <li><strong>Travel Time:</strong> {place.travelTime}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No itinerary available.</p>
      )}
    </div>
  );
};

export default ViewTrip;
