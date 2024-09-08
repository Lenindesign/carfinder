"use client"

import { useState, useMemo, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { MoonIcon, SunIcon, LayoutGridIcon, ListIcon, SearchIcon, CarIcon, TruckIcon, BusIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon, HeartIcon } from 'lucide-react'
import { ThemeProvider, useTheme } from "next-themes"
import Image from 'next/image'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface Vehicle {
  id: string;
  year: number;
  category: string;
  subCategory: string;
  name: string;
  rating: number;
  price: number;
  mpg: string;
  horsepower: number;
  engine: string;
  review: string;
}

const vehicleData: Vehicle[] = [
  { id: "1", year: 2025, category: 'SUV', subCategory: 'Compact SUVs', name: 'Hyundai Kona', rating: 9.5, price: 22500, mpg: '30 city / 35 hwy', horsepower: 147, engine: '2.0L 4-cylinder', review: "The 2025 Hyundai Kona impresses with its stylish design, excellent fuel economy, and competitive pricing. It offers a comfortable ride and a well-equipped interior. However, some may find the base engine a bit underpowered, and the rear cargo space is smaller compared to some rivals." },
  { id: "2", year: 2025, category: 'SUV', subCategory: 'Compact SUVs', name: 'Subaru Crosstrek', rating: 9.0, price: 24995, mpg: '28 city / 33 hwy', horsepower: 152, engine: '2.0L 4-cylinder', review: "The 2025 Subaru Crosstrek continues to shine with its standard all-wheel drive, impressive ground clearance, and rugged capability. It offers a comfortable ride and spacious interior for its class. On the downside, the base engine can feel sluggish, and the infotainment system may not be as intuitive as some competitors." },
  { id: "3", year: 2025, category: 'SUV', subCategory: 'Compact SUVs', name: 'Toyota Corolla Cross', rating: 9.0, price: 23610, mpg: '31 city / 33 hwy', horsepower: 169, engine: '2.0L 4-cylinder', review: "The 2025 Toyota Corolla Cross combines the reliability of the Corolla nameplate with the practicality of an SUV. It offers excellent fuel economy, a comfortable ride, and Toyota's renowned build quality. The spacious interior and cargo area are definite pluses. However, some may find the acceleration to be lackluster, and the design might be too conservative for those seeking a more stylish option." },
  { id: "4", year: 2025, category: 'SUV', subCategory: 'Midsize SUVs', name: 'Jeep Grand Cherokee', rating: 9.0, price: 39000, mpg: '19 city / 26 hwy', horsepower: 293, engine: '3.6L V6', review: "The 2025 Jeep Grand Cherokee continues to impress with its blend of on-road comfort and off-road capability. It offers a luxurious interior, advanced technology features, and powerful engine options. The smooth ride and spacious cabin are definite highlights. However, fuel economy is not its strong suit, especially with the V8 engine option." },
  { id: "5", year: 2025, category: 'SUV', subCategory: 'Midsize SUVs', name: 'Kia Sorento', rating: 9.0, price: 30090, mpg: '24 city / 29 hwy', horsepower: 191, engine: '2.5L 4-cylinder', review: "The 2025 Kia Sorento stands out with its stylish design, comfortable interior, and impressive array of standard features. It offers good fuel economy for its class and an optional third row, making it a versatile choice for families. The ride quality is smooth, and the tech features are user-friendly. On the downside, the third row is quite cramped, and the base engine can feel underpowered when fully loaded." },
  { id: "6", year: 2025, category: 'SUV', subCategory: 'Full-Size SUVs', name: 'Lincoln Navigator', rating: 9.0, price: 77635, mpg: '16 city / 22 hwy', horsepower: 440, engine: '3.5L Twin-Turbo V6', review: "The 2025 Lincoln Navigator continues to set the standard for luxury full-size SUVs. It impresses with its powerful twin-turbo V6 engine, opulent interior, and smooth ride quality. The spacious three-row seating and abundant cargo space make it ideal for large families or those who frequently transport bulky items. However, its size can make it challenging to maneuver in tight spaces, and fuel economy is expectedly low." },
  { id: "7", year: 2025, category: 'SUV', subCategory: 'Full-Size SUVs', name: 'Lexus GX', rating: 8.3, price: 57575, mpg: '15 city / 19 hwy', horsepower: 349, engine: '3.4L Twin-Turbo V6', review: "The 2025 Lexus GX impresses with its robust off-road capabilities, luxurious interior, and reliable build quality. The new twin-turbo V6 engine provides ample power and improved efficiency compared to its predecessor. It offers a comfortable ride on-road and exceptional performance off-road. However, the fuel economy is still below average for the class, and the infotainment system may not be as intuitive as some competitors." },
  { id: "8", year: 2024, category: 'SUV', subCategory: 'Compact SUVs', name: 'Nissan Kicks', rating: 9.0, price: 20290, mpg: '31 city / 36 hwy', horsepower: 122, engine: '1.6L 4-cylinder', review: "The 2024 Nissan Kicks offers exceptional value in the compact SUV segment. It boasts impressive fuel economy, a spacious interior for its size, and a generous list of standard safety features. The ride is comfortable, and the handling is nimble, making it ideal for urban environments. However, the engine can feel underpowered, especially during highway merging or hill climbs. All-wheel drive is not available, which may be a drawback for some buyers." },
  { id: "9", year: 2024, category: 'SUV', subCategory: 'Compact SUVs', name: 'Hyundai Tucson', rating: 9.0, price: 27250, mpg: '26 city / 33 hwy', horsepower: 187, engine: '2.5L 4-cylinder', review: "The 2024 Hyundai Tucson continues to impress with its bold styling, spacious interior, and comprehensive list of standard features. It offers a comfortable ride, good fuel economy, and a choice of efficient powertrains, including hybrid options. The interior design is modern and upscale for its class. On the downside, the base engine can feel a bit underpowered when fully loaded, and the touch-sensitive dashboard controls may not appeal to everyone." },
  { id: "10", year: 2024, category: 'SUV', subCategory: 'Midsize SUVs', name: 'Toyota Venza', rating: 9.0, price: 34120, mpg: '40 city / 37 hwy', horsepower: 219, engine: '2.5L 4-cylinder Hybrid', review: "The 2024 Toyota Venza stands out with its sleek design, upscale interior, and standard hybrid powertrain. It offers exceptional fuel economy for its class, a smooth and quiet ride, and a comfortable cabin. The standard all-wheel drive adds to its versatility. However, some may find the cargo space limited compared to other midsize SUVs, and the infotainment system can be a bit unintuitive. The Venza also lacks the option for a more powerful engine." },
  { id: "11", year: 2025, category: 'Sedan', subCategory: 'Compact Sedans', name: 'Honda Civic', rating: 9.5, price: 23950, mpg: '31 city / 40 hwy', horsepower: 158, engine: '2.0L 4-cylinder', review: "The 2025 Honda Civic continues to be a top choice in the compact sedan segment. It offers a perfect blend of style, performance, and efficiency. The spacious interior, comfortable ride, and responsive handling make it a joy to drive. The Civic also comes with a host of standard safety features. However, the base engine might feel underpowered for some, and the infotainment system can be a bit complex to use while driving." },
  { id: "12", year: 2025, category: 'Sedan', subCategory: 'Midsize Sedans', name: 'Toyota Camry', rating: 9.2, price: 26420, mpg: '28 city / 39 hwy', horsepower: 203, engine: '2.5L 4-cylinder', review: "The 2025 Toyota Camry remains a solid choice in the midsize sedan category. It offers a comfortable ride, spacious interior, and excellent fuel economy. The Camry also boasts a strong reputation for reliability and a comprehensive suite of safety features. On the downside, some might find the styling a bit conservative, and the infotainment system could be more user-friendly." },
  { id: "13", year: 2025, category: 'Sedan', subCategory: 'Full-Size Sedans', name: 'Chrysler 300', rating: 8.5, price: 33545, mpg: '19 city / 30 hwy', horsepower: 292, engine: '3.6L V6', review: "The 2025 Chrysler 300 continues to impress with its bold styling and powerful engine options. It offers a spacious interior, smooth ride, and user-friendly infotainment system. The available V8 engine provides thrilling performance. However, the fuel economy is below average for its class, and the exterior design, while distinctive, may feel dated to some buyers." },
  { id: "14", year: 2025, category: 'Truck', subCategory: 'Full-Size Trucks', name: 'Ford F-150', rating: 9.4, price: 33695, mpg: '20 city / 24 hwy', horsepower: 290, engine: '3.3L V6', review: "The 2025 Ford F-150 maintains its position as a top choice in the full-size truck segment. It offers a range of powerful and efficient engines, including hybrid options. The F-150 boasts impressive towing and payload capacities, a comfortable interior, and advanced technology features. However, the ride can be a bit firm compared to some competitors, and higher trims can get quite expensive." },
  { id: "15", year: 2025, category: 'Truck', subCategory: 'Midsize Trucks', name: 'Toyota Tacoma', rating: 9.0, price: 28600, mpg: '19 city / 24 hwy', horsepower: 278, engine: '3.5L V6', review: "The 2025 Toyota Tacoma continues to be a popular choice in the midsize truck segment. It offers excellent off-road capability, a reputation for reliability, and a comfortable cabin. The Tacoma also retains its value well. However, the on-road ride can be a bit harsh, and the seating position might not be comfortable for taller drivers." },
  { id: "16", year: 2025, category: 'Coupe', subCategory: 'Sports Coupes', name: 'Ford Mustang', rating: 9.2, price: 28400, mpg: '21 city / 32 hwy', horsepower: 310, engine: '2.3L Turbo 4-cylinder', review: "The 2025 Ford Mustang continues to deliver thrilling performance and iconic styling. It offers powerful engine options, sharp handling, and a modern interior with user-friendly tech features. The Mustang provides a good balance of performance and daily usability. However, the rear seats are cramped, and some interior materials feel a bit cheap in lower trims." },
  { id: "17", year: 2025, category: 'SUV', subCategory: 'Luxury Compact SUVs', name: 'BMW X3', rating: 9.1, price: 45400, mpg: '23 city / 29 hwy', horsepower: 248, engine: '2.0L Turbo 4-cylinder', review: "The 2025 BMW X3 impresses with its blend of luxury, performance, and practicality. It offers a range of powerful engines, agile handling, and a well-crafted interior. The X3 provides ample passenger and cargo space for its class. However, some might find the ride a bit firm with the sport suspension, and the options can quickly drive up the price." },
  { id: "18", year: 2025, category: 'Sedan', subCategory: 'Luxury Midsize Sedans', name: 'Mercedes-Benz E-Class', rating: 9.3, price: 56750, mpg: '22 city / 31 hwy', horsepower: 255, engine: '2.0L Turbo 4-cylinder', review: "The 2025 Mercedes-Benz E-Class continues to set the standard for luxury midsize sedans. It offers a sumptuous interior, cutting-edge technology, and a smooth, comfortable ride. The E-Class also provides a range of powerful and efficient engines. However, the infotainment system can be complex to use, and like many luxury vehicles, options can significantly increase the price." },
  { id: "19", year: 2025, category: 'SUV', subCategory: 'Electric SUVs', name: 'Tesla Model Y', rating: 9.4, price: 50490, mpg: '131 city / 117 hwy MPGe', horsepower: 384, engine: 'Dual Motor Electric', review: "The 2025 Tesla Model Y continues to lead the electric SUV segment with its impressive range, performance, and advanced technology. It offers quick acceleration, spacious interior, and access to Tesla's extensive Supercharger network. The minimalist interior design is futuristic and functional. However, build quality can be inconsistent, and the ride might be too firm for some." },
  { id: "20", year: 2025, category: 'Sedan', subCategory: 'Electric Sedans', name: 'Lucid Air', rating: 9.2, price: 77400, mpg: '131 city / 126 hwy MPGe', horsepower: 480, engine: 'Dual Motor Electric', review: "The 2025 Lucid Air impresses with its exceptional range, luxurious interior, and cutting-edge technology. It offers breathtaking acceleration, a smooth ride, and a spacious cabin. The Air's charging speeds are among the fastest in the industry. However, the infotainment system can be laggy at times, and the brand's limited service network might be a concern for some buyers." },
  { id: "21", year: 2025, category: 'Truck', subCategory: 'Electric Trucks', name: 'Rivian R1T', rating: 9.0, price: 73000, mpg: '74 city / 66 hwy MPGe', horsepower: 835, engine: 'Quad Motor Electric', review: "The 2025 Rivian R1T continues to impress as one of the first electric pickup trucks on the market. It offers incredible performance, innovative storage solutions, and genuine off-road capability. The R1T's interior is both luxurious and durable. However, the range drops significantly when towing, and the availability of charging stations can be limited in some areas." },
  { id: "22", year: 2025, category: 'SUV', subCategory: 'Hybrid SUVs', name: 'Toyota RAV4 Hybrid', rating: 9.1, price: 30090, mpg: '41 city / 38 hwy', horsepower: 219, engine: '2.5L 4-cylinder Hybrid', review: "The 2025 Toyota RAV4 Hybrid offers an excellent blend of efficiency and practicality. It provides impressive fuel economy, a comfortable ride, and a spacious interior. The RAV4 Hybrid also comes with a comprehensive suite of safety features. However, the engine can be noisy under hard acceleration, and the infotainment system may not be as user-friendly as some competitors." },
  { id: "23", year: 2025, category: 'Sedan', subCategory: 'Hybrid Sedans', name: 'Honda Accord Hybrid', rating: 9.3, price: 27720, mpg: '48 city / 48 hwy', horsepower: 204, engine: '2.0L 4-cylinder Hybrid', review: "The 2025 Honda Accord Hybrid impresses with its excellent fuel economy, spacious interior, and refined driving dynamics. It offers a comfortable ride, responsive handling, and a well-crafted cabin. The Accord Hybrid also comes with a host of standard safety features. However, the infotainment system can be a bit complicated to use, and some might find the engine noise intrusive under heavy acceleration." },
  { id: "24", year: 2025, category: 'SUV', subCategory: 'Luxury Full-Size SUVs', name: 'Cadillac Escalade', rating: 8.9, price: 79795, mpg: '14 city / 19 hwy', horsepower: 420, engine: '6.2L V8', review: "The 2025 Cadillac Escalade continues to be the epitome of luxury full-size SUVs. It offers a supremely comfortable ride, a lavishly appointed interior, and impressive technology features, including an advanced semi-autonomous driving system. The Escalade provides ample power and a spacious three-row interior. However, fuel economy is poor, and its large size can make it challenging to maneuver in tight spaces." },
  { id: "25", year: 2025, category: 'Sedan', subCategory: 'Luxury Compact Sedans', name: 'Audi A4', rating: 9.0, price: 39900, mpg: '25 city / 34 hwy', horsepower: 201, engine: '2.0L Turbo 4-cylinder', review: "The 2025 Audi A4 continues to impress with its refined driving dynamics, high-quality interior, and advanced technology features. It offers a comfortable ride, responsive handling, and a range of efficient yet powerful engines. The A4's interior is well-crafted with high-quality materials. However, the rear seat space is a bit tight, and some might find the styling too conservative compared to some rivals." },
  { id: "26", year: 2025, category: 'SUV', subCategory: 'Subcompact SUVs', name: 'Mazda CX-30', rating: 9.2, price: 22950, mpg: '26 city / 33 hwy', horsepower: 191, engine: '2.5L 4-cylinder', review: "The 2025 Mazda CX-30 stands out in the subcompact SUV segment with its upscale interior, engaging driving dynamics, and stylish exterior design. It offers a comfortable ride, responsive handling, and a well-crafted cabin that rivals some luxury brands. The CX-30 also comes with a good amount of standard safety features. However, the rear seat and cargo space are a bit tight, and the infotainment system can be less intuitive than some competitors." },
  { id: "27", year: 2025, category: 'Truck', subCategory: 'Compact Trucks', name: 'Ford Maverick', rating: 9.4, price: 22595, mpg: '42 city / 33 hwy', horsepower: 191, engine: '2.5L 4-cylinder Hybrid', review: "The 2025 Ford Maverick continues to impress as a compact truck with its standard hybrid powertrain, excellent fuel economy, and versatile design. It offers a comfortable ride, easy maneuverability, and innovative storage solutions. The Maverick's low starting price makes it an excellent value proposition. However, towing capacity is limited compared to larger trucks, and some might find the interior materials a bit cheap in lower trims." },
  { id: "28", year: 2025, category: 'Sedan', subCategory: 'Compact Sedans', name: 'Mazda3', rating: 9.1, price: 22550, mpg: '28 city / 36 hwy', horsepower: 191, engine: '2.5L 4-cylinder', review: "The 2025 Mazda3 continues to be a standout in the compact sedan segment with its upscale interior, engaging driving dynamics, and stylish exterior design. It offers a comfortable ride, responsive handling, and a well-crafted cabin that rivals some luxury brands. The Mazda3 also comes with a good amount of standard safety features. However, the rear seat space is a bit tight, and the infotainment system may not be as user-friendly as some competitors." },
  { id: "29", year: 2025, category: 'SUV', subCategory: 'Midsize SUVs', name: 'Hyundai Palisade', rating: 9.3, price: 35250, mpg: '19 city / 27 hwy', horsepower: 291, engine: '3.8L V6', review: "The 2025 Hyundai Palisade impresses with its luxurious interior, smooth ride, and abundance of features. It offers spacious three-row seating, user-friendly technology, and a powerful V6 engine. The Palisade also comes with a comprehensive warranty and a host of standard safety features. However, fuel economy is average for the class, and some might find the exterior styling a bit polarizing." },
  { id: "30", year: 2025, category: 'Sedan', subCategory: 'Midsize Sedans', name: 'Kia K5', rating: 9.2, price: 25290, mpg: '27 city / 37 hwy', horsepower: 180, engine: '1.6L Turbo 4-cylinder', review: "The 2025 Kia K5 stands out in the midsize sedan segment with its bold styling, comfortable ride, and value-packed features list. It offers a spacious interior, user-friendly technology, and a choice of efficient powertrains. The K5 also comes with a long warranty and a host of standard safety features. However, the base engine might feel underpowered for some, and rear visibility can be limited due to the sloping roofline." },
  { id: "31", year: 2025, category: 'SUV', subCategory: 'Luxury Midsize SUVs', name: 'Genesis GV80', rating: 9.4, price: 55550, mpg: '21 city / 25 hwy', horsepower: 300, engine: '2.5L Turbo 4-cylinder', review: "The 2025 Genesis GV80 continues to impress as a luxury midsize SUV with its striking design, opulent interior, and smooth ride. It offers a quiet cabin, powerful engine options, and a wealth of advanced technology features. The GV80 provides excellent value compared to some European rivals. However, the third row is tight for adults, and the infotainment system can have a steep learning curve." },
  { id: "32", year: 2025, category: 'Coupe', subCategory: 'Luxury Sports Coupes', name: 'Porsche 911', rating: 9.8, price: 106100, mpg: '18 city / 25 hwy', horsepower: 379, engine: '3.0L Twin-Turbo 6-cylinder', review: "The 2025 Porsche 911 remains the benchmark for sports cars with its exceptional performance, precise handling, and everyday usability. It offers a range of powerful engines, a comfortable interior, and cutting-edge technology. The 911's build quality is excellent, and its resale value is strong. However, the rear seats are tiny, and the options list can quickly drive up the price." },
  { id: "33", year: 2025, category: 'SUV', subCategory: 'Electric Luxury SUVs', name: 'Audi e-tron', rating: 9.0, price: 66800, mpg: '78 city / 77 hwy MPGe', horsepower: 355, engine: 'Dual Motor Electric', review: "The 2025 Audi e-tron impresses with its luxurious interior, smooth and quiet ride, and advanced technology features. It offers quick acceleration, a spacious cabin, and Audi's renowned build quality. The e-tron also provides a comfortable ride and responsive handling. However, its range is less than some competitors, and the infotainment system can be complex to use while driving." },
  { id: "34", year: 2025, category: 'Truck', subCategory: 'Heavy Duty Trucks', name: 'Ram 2500', rating: 9.1, price: 43465, mpg: 'N/A (Heavy Duty)', horsepower: 410, engine: '6.4L V8', review: "The 2025 Ram 2500 stands out in the heavy-duty truck segment with its comfortable ride, upscale interior options, and strong towing capabilities. It offers a range of powerful engines, including an impressive diesel option, and an available air suspension that enhances ride comfort and load-leveling. However, its size can make it challenging to maneuver in tight spaces, and fuel economy is expectedly low." },
  { id: "35", year: 2025, category: 'SUV', subCategory: 'Luxury Subcompact SUVs', name: 'Volvo XC40', rating: 9.2, price: 36350, mpg: '23 city / 32 hwy', horsepower: 247, engine: '2.0L Turbo 4-cylinder', review: "The 2025 Volvo XC40 continues to impress with its stylish design, comfortable interior, and comprehensive safety features. It offers a smooth ride, peppy performance, and a well-crafted cabin with premium materials. The XC40 also provides good cargo space for its class. However, the infotainment system can be laggy at times, and the rear seats might be tight for taller passengers." },
  { id: "36", year: 2025, category: 'Sedan', subCategory: 'Full-Size Sedans', name: 'Kia Stinger', rating: 9.0, price: 36090, mpg: '22 city / 32 hwy', horsepower: 300, engine: '2.5L Turbo 4-cylinder', review: "The 2025 Kia Stinger continues to offer a compelling blend of performance, style, and practicality. It provides strong engine options, agile handling, and a spacious interior with a hatchback design for added versatility. The Stinger also comes well-equipped with features and has a premium feel. However, fuel economy is below average for the class, and some might find the interior design less luxurious compared to some European rivals." },
  { id: "37", year: 2025, category: 'SUV', subCategory: 'Midsize SUVs', name: 'Mazda CX-9', rating: 9.1, price: 35630, mpg: '20 city / 26 hwy', horsepower: 227, engine: '2.5L Turbo 4-cylinder', review: "The 2025 Mazda CX-9 stands out in the midsize SUV segment with its upscale interior, engaging driving dynamics, and sleek exterior design. It offers a comfortable ride, responsive handling, and a well-crafted cabin that rivals some luxury brands. The CX-9 also comes with a good amount of standard safety features. However, the third row is tight for adults, and cargo space is less than some competitors when all seats are in use." },
  { id: "38", year: 2025, category: 'Sedan', subCategory: 'Electric Luxury Sedans', name: 'Porsche Taycan', rating: 9.5, price: 86700, mpg: '79 city / 80 hwy MPGe', horsepower: 402, engine: 'Dual Motor Electric', review: "The 2025 Porsche Taycan continues to set the standard for electric performance sedans. It offers breathtaking acceleration, precise handling, and a luxurious interior with cutting-edge technology. The Taycan's build quality is excellent, and it provides a good balance of performance and range. However, the rear seat and cargo space are limited, and like many Porsches, options can quickly drive up the price." }
]

function VehicleRankings() {
  const [filterYear, setFilterYear] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterSubCategory, setFilterSubCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isGridView, setIsGridView] = useState<boolean>(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([20000, 150000])

  useEffect(() => {
    setMounted(true)
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedVehicleIndex !== null) {
        if (event.key === 'ArrowLeft') {
          handlePreviousVehicle()
        } else if (event.key === 'ArrowRight') {
          handleNextVehicle()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedVehicleIndex])

  const categories = useMemo(() =>
    [...new Set(vehicleData.map(vehicle => vehicle.category))], []
  )
  const subCategories = useMemo(() =>
    [...new Set(vehicleData.map(vehicle => vehicle.subCategory))], []
  )
  const years = useMemo(() =>
    [...new Set(vehicleData.map(vehicle => vehicle.year))], []
  )

  const filteredAndSortedVehicles = useMemo(() => {
    return vehicleData
      .filter(vehicle => filterYear === 'all' || vehicle.year.toString() === filterYear)
      .filter(vehicle => filterCategory === 'all'|| vehicle.category === filterCategory)
      .filter(vehicle => filterSubCategory === 'all' || vehicle.subCategory === filterSubCategory)
      .filter(vehicle => vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(vehicle => vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1])
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'price') return a.price - b.price
        if (sortBy === 'mpg') {
          const [aCityMpg] = a.mpg.split(' ')[0].split('/')
          const [bCityMpg] = b.mpg.split(' ')[0].split('/')
          return parseInt(bCityMpg) - parseInt(aCityMpg)
        }
        if (sortBy === 'horsepower') return b.horsepower - a.horsepower
        if (sortBy === 'favorites') return favorites.includes(b.id) ? 1 : -1
        return a.name.localeCompare(b.name)
      })
  }, [filterYear, filterCategory, filterSubCategory, sortBy, searchTerm, favorites, priceRange])

  const topScores = useMemo(() => {
    const scores: Record<string, Vehicle> = {}
    vehicleData.forEach(vehicle => {
      const key = `${vehicle.year}-${vehicle.category}-${vehicle.subCategory}`
      if (!scores[key] || vehicle.rating > scores[key].rating) {
        scores[key] = vehicle
      }
    })
    return scores
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const toggleView = useCallback(() => {
    setIsGridView(prev => !prev)
  }, [])

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'SUV':
        return <BusIcon className="h-5 w-5 mr-1" />
      case 'Sedan':
        return <CarIcon className="h-5 w-5 mr-1" />
      case 'Truck':
        return <TruckIcon className="h-5 w-5 mr-1" />
      case 'Coupe':
        return <CarIcon className="h-5 w-5 mr-1" />
      default:
        return null
    }
  }, [])

  const isTopScore = useCallback((vehicle: Vehicle) => {
    const key = `${vehicle.year}-${vehicle.category}-${vehicle.subCategory}`
    return topScores[key] === vehicle
  }, [topScores])

  const handlePreviousVehicle = useCallback(() => {
    if (selectedVehicleIndex !== null && selectedVehicleIndex > 0) {
      setSelectedVehicleIndex(selectedVehicleIndex - 1)
    }
  }, [selectedVehicleIndex])

  const handleNextVehicle = useCallback(() => {
    if (selectedVehicleIndex !== null && selectedVehicleIndex < filteredAndSortedVehicles.length - 1) {
      setSelectedVehicleIndex(selectedVehicleIndex + 1)
    }
  }, [selectedVehicleIndex, filteredAndSortedVehicles.length])

  const toggleFavorite = useCallback((vehicleId: string) => {
    setFavorites(prev => 
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    )
  }, [])

  const handlePriceRangeChange = useCallback((newValues: number[]) => {
    setPriceRange(newValues as [number, number])
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Floating Sidebar */}
      <aside className="fixed left-4 top-20 bottom-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 ease-in-out z-10 hidden md:block">
        <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
          <div>
            <Label htmlFor="year-filter">Year</Label>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger id="year-filter">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category-filter">Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="subcategory-filter">Subcategory</Label>
            <Select value={filterSubCategory} onValueChange={setFilterSubCategory}>
              <SelectTrigger id="subcategory-filter">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {subCategories.map(subCategory => (
                  <SelectItem key={subCategory} value={subCategory}>{subCategory}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="mpg">MPG</SelectItem>
                <SelectItem value="horsepower">Horsepower</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-base font-semibold mb-2 block">Price Range</Label>
            <div className="flex justify-between mb-2">
              <div className="flex flex-col w-[45%]">
                <Input
                  type="text"
                  value={formatPrice(priceRange[0])}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/\D/g, ''))
                    if (!isNaN(value) && value >= 20000 && value <= priceRange[1]) {
                      setPriceRange([value, priceRange[1]])
                    }
                  }}
                  className="w-full text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">to</span>
              </div>
              <div className="flex flex-col w-[45%]">
                <Input
                  type="text"
                  value={priceRange[1] >= 150000 ? '$150,000+' : formatPrice(priceRange[1])}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/\D/g, ''))
                    if (!isNaN(value) && value >= priceRange[0] && value <= 150000) {
                      setPriceRange([priceRange[0], value])
                    }
                  }}
                  className="w-full text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <SliderPrimitive.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              min={20000}
              max={150000}
              step={1000}
            >
              <SliderPrimitive.Track className="bg-gray-200 dark:bg-gray-700 relative grow rounded-full h-2">
                <SliderPrimitive.Range className="absolute bg-red-500 rounded-full h-full" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white dark:bg-gray-200 shadow-lg rounded-full hover:bg-gray-100 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
              <SliderPrimitive.Thumb className="block w-5 h-5 bg-white dark:bg-gray-200 shadow-lg rounded-full hover:bg-gray-100 dark:hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </SliderPrimitive.Root>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 md:ml-72">
        {/* Navigation bar */}
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="mr-2 md:hidden">
                  <MenuIcon className="h-6 w-6" />
                </Button>
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mt-logo-mHZQLj6zhD4BxZSo7Pl7A736YnQT8c.svg"
                    alt="MotorTrend Logo"
                    width={128}
                    height={24}
                    className="h-8 w-auto"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
                <button
                  onClick={toggleView}
                  className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isGridView ? <ListIcon className="h-6 w-6" /> : <LayoutGridIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="mb-8 mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Ultimate Car Rankings™</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the best vehicles across all categories, backed by MotorTrend's expert analysis and rigorous testing.
          </p>
        </div>
        
        {/* Vehicle grid/list */}
        <div className={`grid grid-cols-1 ${isGridView ? 'sm:grid-cols-2 lg:grid-cols-3' : ''} gap-4 md:gap-8`}>
          {filteredAndSortedVehicles.map((vehicle, index) => (
            <Card 
              key={vehicle.id} 
              className={`flex ${isGridView ? 'flex-col' : 'flex-row'} bg-white dark:bg-gray-800 border-0 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:scale-105`}
            >
              <div 
                className={`relative ${isGridView ? 'w-full' : 'w-1/3'}`}
                onClick={() => setSelectedVehicleIndex(index)}
              >
                <Image
                  src={`/placeholder.svg?height=192&width=384&text=${encodeURIComponent(vehicle.name)}`}
                  alt={`${vehicle.name} - ${vehicle.year} ${vehicle.category}`}
                  width={384}
                  height={192}
                  className={`${isGridView ? 'w-full h-48' : 'w-full h-full'} object-cover`}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Badge className="bg-black bg-opacity-70 text-white font-semibold px-2 py-1 text-xs rounded-full">{vehicle.subCategory}</Badge>
                  <Badge className="bg-black bg-opacity-70 text-white font-semibold px-2 py-1 text-xs rounded-full">{vehicle.year}</Badge>
                </div>
                {isTopScore(vehicle) && (
                  <div className="absolute top-2 left-2">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trophy-jnzTHFrtU49mwk5rKNQpuXlGeT6IaY.svg"
                      alt="Top Score Trophy"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
              </div>
              <div className={`${isGridView ? '' : 'w-2/3'} p-4 flex flex-col justify-between`}>
                <div>
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{vehicle.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">{vehicle.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center">
                      {getCategoryIcon(vehicle.category)}
                      Category: {vehicle.category}
                    </p>
                    <p className="font-bold text-base md:text-lg text-gray-900 dark:text-white">Price: ${vehicle.price.toLocaleString()}</p>
                  </CardContent>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 self-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(vehicle.id);
                  }}
                >
                  <HeartIcon className={`h-5 w-5 ${favorites.includes(vehicle.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
            {/* Mobile sidebar content (same as desktop sidebar) */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Vehicle Details Modal */}
      <Dialog 
        open={selectedVehicleIndex !== null} 
        onOpenChange={(open) => {
          if (!open) setSelectedVehicleIndex(null);
        }}
      >
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          {selectedVehicleIndex !== null && filteredAndSortedVehicles[selectedVehicleIndex] && (
            <div className="flex flex-col md:flex-row h-[600px]">
              <div className="relative w-full md:w-1/2 h-64 md:h-full">
                <Image
                  src={`/placeholder.svg?height=600&width=400&text=${encodeURIComponent(filteredAndSortedVehicles[selectedVehicleIndex].name)}`}
                  alt={`${filteredAndSortedVehicles[selectedVehicleIndex].name} - ${filteredAndSortedVehicles[selectedVehicleIndex].year} ${filteredAndSortedVehicles[selectedVehicleIndex].category}`}
                  layout="fill"
                  objectFit="cover"
                />
                {isTopScore(filteredAndSortedVehicles[selectedVehicleIndex]) && (
                  <div className="absolute top-4 left-4 flex items-center bg-yellow-400 bg-opacity-90 rounded-full p-2 shadow-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/trophy-jnzTHFrtU49mwk5rKNQpuXlGeT6IaY.svg"
                      alt="Top Score Trophy"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2 text-sm font-bold text-gray-900">Top Rated</span>
                  </div>
                )}
                {/* Navigation controls for the modal */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center space-x-4 bg-black bg-opacity-50 rounded-full px-4 py-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePreviousVehicle}
                    disabled={selectedVehicleIndex === 0}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                    <span className="sr-only">Previous vehicle</span>
                  </Button>
                  <span className="text-white text-sm font-medium">
                    {selectedVehicleIndex + 1} / {filteredAndSortedVehicles.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextVehicle}
                    disabled={selectedVehicleIndex === filteredAndSortedVehicles.length - 1}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                    <span className="sr-only">Next vehicle</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col p-6 md:w-1/2 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{filteredAndSortedVehicles[selectedVehicleIndex].name}</DialogTitle>
                  <DialogDescription>
                    {filteredAndSortedVehicles[selectedVehicleIndex].year} {filteredAndSortedVehicles[selectedVehicleIndex].category} - {filteredAndSortedVehicles[selectedVehicleIndex].subCategory}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">Rating</Label>
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">{filteredAndSortedVehicles[selectedVehicleIndex].rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">Price</Label>
                    <span className="text-xl font-semibold">${filteredAndSortedVehicles[selectedVehicleIndex].price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">MPG</Label>
                    <span>{filteredAndSortedVehicles[selectedVehicleIndex].mpg}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">Horsepower</Label>
                    <span>{filteredAndSortedVehicles[selectedVehicleIndex].horsepower} hp</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label className="font-semibold">Engine</Label>
                    <span>{filteredAndSortedVehicles[selectedVehicleIndex].engine}</span>
                  </div>
                  <div className="mt-4">
                    <Label className="font-semibold">Review</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {filteredAndSortedVehicles[selectedVehicleIndex].review}
                    </p>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => toggleFavorite(filteredAndSortedVehicles[selectedVehicleIndex].id)}
                  >
                    <HeartIcon className={`h-5 w-5 mr-2 ${favorites.includes(filteredAndSortedVehicles[selectedVehicleIndex].id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                    {favorites.includes(filteredAndSortedVehicles[selectedVehicleIndex].id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setSelectedVehicleIndex(null)}>
                    Close
                  </Button>
                </DialogFooter>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function VehicleRankings() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <VehicleRankings />
    </ThemeProvider>
  )
}