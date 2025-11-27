import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface BookingData {
  // Step 1: Pet Information
  petName: string;
  petType: string;
  petBreed: string;
  petWeight: string;
  petAge: string;
  specialNeeds: string;
  
  // Step 2: Flight Details
  departureCity: string;
  arrivalCity: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  travelClass: string;
  
  // Step 3: Additional Services
  doorToDoor: boolean;
  petSpa: boolean;
  liveStreaming: boolean;
  specialMeal: boolean;
  insurance: boolean;
  
  // Step 4: Owner Information
  ownerName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const steps = [
  { id: 1, name: 'Pet Info', emoji: '🐾' },
  { id: 2, name: 'Flight Details', emoji: '✈️' },
  { id: 3, name: 'Extra Services', emoji: '⭐' },
  { id: 4, name: 'Your Info', emoji: '👤' },
];

const petTypes = [
  { value: 'dog', label: 'Dog', emoji: '🐕' },
  { value: 'cat', label: 'Cat', emoji: '🐈' },
  { value: 'bird', label: 'Bird', emoji: '🦜' },
  { value: 'rabbit', label: 'Rabbit', emoji: '🐰' },
  { value: 'other', label: 'Other', emoji: '🦎' },
];

const travelClasses = [
  { 
    value: 'economy', 
    label: 'Economy', 
    price: '$99',
    emoji: '💺',
    description: 'Comfortable and affordable'
  },
  { 
    value: 'premium', 
    label: 'Premium', 
    price: '$199',
    emoji: '🎖️',
    description: 'Extra space and amenities',
    popular: true
  },
  { 
    value: 'first', 
    label: 'First Class', 
    price: '$399',
    emoji: '👑',
    description: 'Ultimate luxury experience'
  },
];

const additionalServices = [
  { id: 'doorToDoor', label: 'Door-to-Door Service', price: 50, emoji: '🚚' },
  { id: 'petSpa', label: 'Pet Spa & Grooming', price: 75, emoji: '✨' },
  { id: 'liveStreaming', label: 'Live HD Streaming', price: 25, emoji: '📹' },
  { id: 'specialMeal', label: 'Special Meal Plan', price: 30, emoji: '🍖' },
  { id: 'insurance', label: 'Travel Insurance', price: 45, emoji: '🛡️' },
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    petName: '',
    petType: '',
    petBreed: '',
    petWeight: '',
    petAge: '',
    specialNeeds: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: undefined,
    returnDate: undefined,
    travelClass: 'premium',
    doorToDoor: false,
    petSpa: false,
    liveStreaming: false,
    specialMeal: false,
    insurance: false,
    ownerName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const calculateProgress = () => (currentStep / steps.length) * 100;

  const calculateTotal = () => {
    let total = 0;
    const classPrice = travelClasses.find(tc => tc.value === bookingData.travelClass);
    if (classPrice) {
      total += parseInt(classPrice.price.replace('$', ''));
    }
    
    additionalServices.forEach(service => {
      if (bookingData[service.id as keyof BookingData] === true) {
        total += service.price;
      }
    });
    
    return total;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-pet-blue to-pet-navy text-white pb-8">
        <CardTitle className="text-3xl font-bold text-center mb-4">
          Book Your Pet's Adventure! 🛫
        </CardTitle>
        <CardDescription className="text-white/90 text-center text-lg">
          Let's make travel fun for your furry friend
        </CardDescription>
        
        {/* Progress Steps */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all",
                  step.id === currentStep && "scale-110",
                  step.id < currentStep && "opacity-70",
                  step.id > currentStep && "opacity-40"
                )}
                onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 transition-all",
                  step.id === currentStep ? "bg-pet-orange animate-bounce" : "bg-white/20"
                )}>
                  {step.emoji}
                </div>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ))}
          </div>
          <Progress value={calculateProgress()} className="h-2 bg-white/20" />
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {/* Step 1: Pet Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-pet-navy mb-6">
              Tell us about your pet! 🐾
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="petName" className="text-pet-navy font-semibold mb-2 block">
                  Pet's Name
                </Label>
                <Input
                  id="petName"
                  placeholder="e.g., Buddy"
                  value={bookingData.petName}
                  onChange={(e) => updateBookingData('petName', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
              
              <div>
                <Label className="text-pet-navy font-semibold mb-2 block">
                  Pet Type
                </Label>
                <RadioGroup
                  value={bookingData.petType}
                  onValueChange={(value) => updateBookingData('petType', value)}
                  className="flex flex-wrap gap-3"
                >
                  {petTypes.map((type) => (
                    <Label
                      key={type.value}
                      className={cn(
                        "flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-full border-2 transition-all",
                        bookingData.petType === type.value
                          ? "border-pet-orange bg-pet-orange/10"
                          : "border-gray-200 hover:border-pet-blue"
                      )}
                    >
                      <RadioGroupItem value={type.value} className="sr-only" />
                      <span className="text-2xl">{type.emoji}</span>
                      <span className="font-medium">{type.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="petBreed" className="text-pet-navy font-semibold mb-2 block">
                  Breed
                </Label>
                <Input
                  id="petBreed"
                  placeholder="e.g., Golden Retriever"
                  value={bookingData.petBreed}
                  onChange={(e) => updateBookingData('petBreed', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
              
              <div>
                <Label htmlFor="petWeight" className="text-pet-navy font-semibold mb-2 block">
                  Weight (lbs)
                </Label>
                <Input
                  id="petWeight"
                  type="number"
                  placeholder="e.g., 45"
                  value={bookingData.petWeight}
                  onChange={(e) => updateBookingData('petWeight', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="specialNeeds" className="text-pet-navy font-semibold mb-2 block">
                Special Needs or Instructions (Optional)
              </Label>
              <textarea
                id="specialNeeds"
                placeholder="Let us know about any medications, dietary restrictions, or special care needs..."
                value={bookingData.specialNeeds}
                onChange={(e) => updateBookingData('specialNeeds', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all resize-none"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 2: Flight Details */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-pet-navy mb-6">
              Where are we going? ✈️
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-pet-navy font-semibold mb-2 block">
                  Departure City
                </Label>
                <Select
                  value={bookingData.departureCity}
                  onValueChange={(value) => updateBookingData('departureCity', value)}
                >
                  <SelectTrigger className="rounded-2xl border-2 border-pet-blue/20">
                    <SelectValue placeholder="Select departure city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nyc">New York (JFK)</SelectItem>
                    <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                    <SelectItem value="chi">Chicago (ORD)</SelectItem>
                    <SelectItem value="mia">Miami (MIA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-pet-navy font-semibold mb-2 block">
                  Arrival City
                </Label>
                <Select
                  value={bookingData.arrivalCity}
                  onValueChange={(value) => updateBookingData('arrivalCity', value)}
                >
                  <SelectTrigger className="rounded-2xl border-2 border-pet-blue/20">
                    <SelectValue placeholder="Select arrival city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nyc">New York (JFK)</SelectItem>
                    <SelectItem value="lax">Los Angeles (LAX)</SelectItem>
                    <SelectItem value="chi">Chicago (ORD)</SelectItem>
                    <SelectItem value="mia">Miami (MIA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-pet-navy font-semibold mb-2 block">
                  Departure Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-2xl border-2 border-pet-blue/20",
                        !bookingData.departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.departureDate ? (
                        format(bookingData.departureDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.departureDate}
                      onSelect={(date) => updateBookingData('departureDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label className="text-pet-navy font-semibold mb-2 block">
                  Return Date (Optional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal rounded-2xl border-2 border-pet-blue/20",
                        !bookingData.returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {bookingData.returnDate ? (
                        format(bookingData.returnDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={bookingData.returnDate}
                      onSelect={(date) => updateBookingData('returnDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label className="text-pet-navy font-semibold mb-4 block">
                Travel Class
              </Label>
              <div className="grid md:grid-cols-3 gap-4">
                {travelClasses.map((tClass) => (
                  <div
                    key={tClass.value}
                    onClick={() => updateBookingData('travelClass', tClass.value)}
                    className={cn(
                      "relative p-6 rounded-2xl border-2 cursor-pointer transition-all",
                      bookingData.travelClass === tClass.value
                        ? "border-pet-orange bg-pet-orange/10 scale-105 shadow-lg"
                        : "border-gray-200 hover:border-pet-blue hover:shadow-md"
                    )}
                  >
                    {tClass.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pet-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular!
                      </div>
                    )}
                    <div className="text-center">
                      <span className="text-4xl block mb-2">{tClass.emoji}</span>
                      <h4 className="font-bold text-pet-navy">{tClass.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{tClass.description}</p>
                      <p className="text-2xl font-bold text-pet-blue mt-3">{tClass.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Additional Services */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-pet-navy mb-6">
              Make it extra special! ⭐
            </h3>
            
            <div className="space-y-4">
              {additionalServices.map((service) => (
                <label
                  key={service.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    bookingData[service.id as keyof BookingData]
                      ? "border-pet-orange bg-pet-orange/10"
                      : "border-gray-200 hover:border-pet-blue"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={bookingData[service.id as keyof BookingData] as boolean}
                      onCheckedChange={(checked) => updateBookingData(service.id as keyof BookingData, checked)}
                      className="data-[state=checked]:bg-pet-orange data-[state=checked]:border-pet-orange"
                    />
                    <span className="text-2xl">{service.emoji}</span>
                    <span className="font-medium text-pet-navy">{service.label}</span>
                  </div>
                  <span className="font-bold text-pet-blue">+${service.price}</span>
                </label>
              ))}
            </div>
            
            <div className="bg-pet-light rounded-2xl p-6 mt-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-semibold text-pet-navy">Estimated Total:</span>
                <span className="font-bold text-pet-orange text-3xl">${calculateTotal()}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">*Final price may vary based on specific routes and dates</p>
            </div>
          </div>
        )}

        {/* Step 4: Owner Information */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-pet-navy mb-6">
              Almost done! Tell us about you 👤
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ownerName" className="text-pet-navy font-semibold mb-2 block">
                  Your Name
                </Label>
                <Input
                  id="ownerName"
                  placeholder="John Doe"
                  value={bookingData.ownerName}
                  onChange={(e) => updateBookingData('ownerName', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-pet-navy font-semibold mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={bookingData.email}
                  onChange={(e) => updateBookingData('email', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-pet-navy font-semibold mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData('phone', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyContact" className="text-pet-navy font-semibold mb-2 block">
                  Emergency Contact
                </Label>
                <Input
                  id="emergencyContact"
                  placeholder="Jane Doe"
                  value={bookingData.emergencyContact}
                  onChange={(e) => updateBookingData('emergencyContact', e.target.value)}
                  className="rounded-2xl border-2 border-pet-blue/20 focus:border-pet-orange transition-all"
                />
              </div>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mt-6">
              <h4 className="font-bold text-green-800 mb-2 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Booking Summary
              </h4>
              <div className="space-y-2 text-green-700">
                <p><strong>Pet:</strong> {bookingData.petName} ({bookingData.petType})</p>
                <p><strong>Route:</strong> {bookingData.departureCity} → {bookingData.arrivalCity}</p>
                <p><strong>Class:</strong> {bookingData.travelClass}</p>
                <p><strong>Total:</strong> ${calculateTotal()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-full px-6 py-3 font-semibold border-2 border-pet-blue text-pet-blue hover:bg-pet-blue hover:text-white transition-all"
          >
            ← Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="rounded-full px-6 py-3 font-semibold bg-pet-orange hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Continue →
            </Button>
          ) : (
            <Button
              className="rounded-full px-8 py-3 font-bold text-lg bg-gradient-to-r from-pet-orange to-pet-blue hover:shadow-lg transition-all transform hover:scale-105"
            >
              Complete Booking 🎉
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}