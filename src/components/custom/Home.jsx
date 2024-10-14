import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, MapPin, Plus, Users } from "lucide-react";
import Header from "./Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMPETITION, ME } from "@/queries";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const navigate = useNavigate();
  const [createCompetition, result] = useMutation(CREATE_COMPETITION);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);

  const { data: meData, loading: meLoading } = useQuery(ME);

  if (meLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader size={64} />
      </div>
    );
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log({ title, description, image, category, seats });

    try {
      if (!title || !description || !category || !image || !seats || !price) {
        return toast.error("Please fill the entire form");
      }

      await createCompetition({
        variables: {
          title,
          description,
          category,
          image,
          seats: parseInt(seats),
          price: parseInt(price),
        },
      });

      console.log(result);

      return toast.success("Created competition successfully");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto p-4 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Welcome back, {meData?.username}
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create Competition
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Competition</DialogTitle>
                  <DialogDescription>
                    Create a new competition
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="name"
                      onChange={(e) => setTitle(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Seats
                    </Label>
                    <Input
                      id="seats"
                      type="number"
                      onChange={(e) => setSeats(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="category"
                      onChange={(e) => setCategory(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      id="image"
                      onChange={(e) => setImage(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={(e) => handleCreate(e)}>
                    Create Competition
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Competitions</CardTitle>
                <CardDescription>some competitions hahahah</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    {
                      name: "Full stack frenzy",
                      date: "2024-10-15",
                      time: "09:00 AM",
                      location: "Bahria Auditorium,",
                    },
                    {
                      name: "Graphic design",
                      date: "2024-10-20",
                      time: "02:00 PM",
                      location: "Main Auditorium",
                    },
                    {
                      name: "Video editing",
                      date: "2024-10-25",
                      time: "07:00 PM",
                      location: "fsadf",
                    },
                  ].map((event, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{event.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <p className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" /> {event.date} at{" "}
                            {event.time}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" /> {event.location}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your events</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Users className="mb-2 h-5 w-5" />
                  Manage Participants
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <MapPin className="mb-2 h-5 w-5" />
                  Venue Setup
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Clock className="mb-2 h-5 w-5" />
                  Schedule Changes
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Calendar className="mb-2 h-5 w-5" />
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your events</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    action: "New attendee registered",
                    event: "Annual Gala Dinner",
                    time: "2 hours ago",
                  },
                  {
                    action: "Updated venue details",
                    event: "Team Building Workshop",
                    time: "5 hours ago",
                  },
                  {
                    action: "Sent invitations",
                    event: "Product Launch",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <li key={index} className="flex items-center space-x-4">
                    <div className="bg-secondary text-secondary-foreground rounded-full p-2">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.event} - {activity.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
