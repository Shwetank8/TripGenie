import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SelectBudgetOptions, SelectTravelsList } from "@/utils/options";
import { BudgetOption, FormValues, PeopleOption } from "@/utils/types";
import { Button } from "@/components/ui/button";
import usePlanner from "@/hook/usePlanner";

const CreateTrip: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { generateItinerary, loading, error, response } = usePlanner();

  const onSubmit = async (data: FormValues) => {
    try {
        const { destination, days, budget, people } = data;
        const itinerary = await generateItinerary(destination, days, budget, people);

        if (!itinerary) {
            console.error("Itinerary generation failed or returned undefined.");
            return;
        }

        console.log(itinerary);
        return itinerary;
    } catch (err) {
        console.error("Error generating itinerary:", err);
    }
};



  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-bold text-3xl sm:text-4xl text-gray-800">
          Tell us your travel preferences
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>

      {/* Form */}
      <form
        className="bg-white shadow-lg rounded-lg p-8 mt-10 max-w-3xl mx-auto space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Destination Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            What is the destination of your choice?
          </label>
          <Input
            placeholder="Example: Chennai"
            type="text"
            {...register("destination", { required: "Destination is required" })}
            className="mt-2 w-full"
          />
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>

        {/* Days Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            How many days are you planning for your trip?
          </label>
          <Input
            placeholder="Example: 3"
            type="number"
            {...register("days", {
              required: "Number of days is required",
              min: { value: 1, message: "At least 1 day is required" },
            })}
            className="mt-2 w-full"
          />
          {errors.days && (
            <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>
          )}
        </div>

        {/* Budget Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            What is your budget?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            {SelectBudgetOptions.map((option: BudgetOption) => (
              <label
                key={option.id}
                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <input
                  type="radio"
                  value={option.title}
                  {...register("budget", { required: "Please select a budget" })}
                  className="hidden"
                />
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-semibold mt-2">
                  {option.title}
                </span>
                <span className="text-sm text-gray-500">{option.desc}</span>
              </label>
            ))}
          </div>
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* People Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Who do you plan on traveling with on your next adventure?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            {SelectTravelsList.map((option: PeopleOption) => (
              <label
                key={option.id}
                className="p-4 border rounded-lg hover:shadow-lg cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <input
                  type="radio"
                  value={option.title}
                  {...register("people", {
                    required: "Please select a group size",
                  })}
                  className="hidden"
                />
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-semibold mt-2">
                  {option.title}
                </span>
                <span className="text-sm text-gray-500">{option.desc}</span>
              </label>
            ))}
          </div>
          {errors.people && (
            <p className="text-red-500 text-sm mt-1">{errors.people.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Generate Trip
          </Button>
        </div>
      </form>

    </div>
  );
};

export default CreateTrip;
