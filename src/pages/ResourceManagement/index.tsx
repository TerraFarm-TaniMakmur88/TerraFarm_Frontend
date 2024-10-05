import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import cropIcon from "@/assets/images/crop_type.png"
import { HelpCircle, InfoIcon, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Field {
    cropType: string;
    area: number;
    soilType: string;
    plantingDate: string;
  }

function ResourceManagement() {
    const idealCrops = [
        'Rice',
        'Corn',
        'Cassava',
        'Tea',
        'Wheat'
    ];

    const myFields = [
        {
            cropType: 'Rice',
            area: 4.00,
            soilType: 'Sand',
            plantingDate: '2024/10/04'
        },
        {
            cropType: 'Corn',
            area: 4.00,
            soilType: 'Sand',
            plantingDate: '2024/10/04'
        },
        {
            cropType: 'Cassava',
            area: 4.00,
            soilType: 'Sand',
            plantingDate: '2024/10/04'
        }
    ]

    const [totalRevenue, setTotalRevenue] = useState('');
    const [costOfGoodsSold, setCostOfGoodsSold] = useState('');
    const [profit, setProfit] = useState(0);
    const [profitMargin, setProfitMargin] = useState(0);

    const calculateProfit = () => {
        const revenue = parseFloat(totalRevenue);
        const cost = parseFloat(costOfGoodsSold);
        
        if (!isNaN(revenue) && !isNaN(cost)) {
            const operatingProfit = revenue - cost;
            const operatingProfitMarginRatio = operatingProfit / revenue;
            setProfit(operatingProfit);
            setProfitMargin(operatingProfitMarginRatio * 100);
        }
    };

    return (
        <div className="w-screen bg-resource-bg-custom-gradient flex flex-col px-10 py-12 items-start">
            <p className="font-figtree font-bold text-3xl text-black">Resource management tool</p>
            <p className="mt-6 mb-3 font-figtree font-semibold text-xl text-black">Best crops to plant on your field</p>
            <Carousel className="w-full">
                <CarouselContent className="h-16 p-1 flex gap-0">
                    {idealCrops.map((crop, index) => (
                        <CarouselItem key={index} className="basis-2/5 flex-shrink-0 w-40 drop-shadow-xs">
                            <div className="w-full flex flex-row items-center gap-2 py-3 px-3 drop-shadow-lg bg-[#F2F7F2] rounded-lg">
                                <img src={cropIcon} className="h-6" alt="Crop Icon" />
                                <p className="font-figtree font-semibold text-black text-base">
                                    {crop}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="flex flex-row w-full mt-1 gap-2 items-center">
                <InfoIcon className="text-gray-400" style={{ height: '16px', }} />
                <p className="grow font-figtree font-normal text-gray-400 text-xs">
                    Recommendation is generated from your field's condition and environment
                </p>
            </div>

            <p className="mt-7 mb-3 font-figtree font-semibold text-xl text-black">Time to harvest!</p>
            <div className="w-full grid grid-cols-1 gap-4 h-44 overflow-y-auto">
                {myFields.map((field, index) => (
                    <div key={index} className='flex flex-col gap-1 px-5 py-3 w-full rounded-xl bg-[#F2F7F2] drop-shadow-md'>
                        <p className='font-figtree font-bold text-sm text-secondary-default'>Harvest in 4 days!</p>
                        <div className='flex flex-row w-full items-center'>
                            <div className='grow flex flex-row gap-4 items-center'>
                                <p className='font-figtree font-bold text-xl text-primary-default'>{field.cropType}</p>
                                {/* <div className='bg-secondary-default h-fit py-0.5 px-1.5 rounded-md font-figtree font-medium text-sm text-white'>
                                    Failure
                                </div> */}
                                <div className='bg-primary-default h-fit py-0.5 px-1.5 rounded-md font-figtree font-medium text-sm text-white'>
                                    Planting
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='p-0 m-0 focus:ring-0 ring-0'>
                                        <MoreVertical style={{ height: '16px', strokeWidth: 2 }} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="absolute right-0 w-fit bg-white px-5 py-2 rounded-lg ring-0 focus:ring-0 drop-shadow-md">
                                    <DropdownMenuLabel className="whitespace-nowrap m-1">Replant</DropdownMenuLabel>
                                    <DropdownMenuLabel className="whitespace-nowrap m-1">Harvest</DropdownMenuLabel>
                                    <DropdownMenuLabel className="whitespace-nowrap m-1">Crop failure</DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className='flex flex-row w-full'>
                            <p className='grow font-figtree font-normal text-base text-black'>Planting date</p>
                            <p className='font-figtree font-semibold text-base text-black'>{field.plantingDate}</p>
                        </div>
                        <div className='flex flex-row w-full'>
                            <p className='grow font-figtree font-normal text-base text-black'>Area</p>
                            <p className='font-figtree font-semibold text-base text-black'>{field.area} ha</p>
                        </div>
                        <div className='flex flex-row w-full'>
                            <p className='grow font-figtree font-normal text-base text-black'>Soil type</p>
                            <p className='font-figtree font-semibold text-base text-black'>{field.soilType}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row w-full mt-2 gap-2 items-center">
                <InfoIcon className="text-gray-400" style={{ height: '16px', }} />
                <p className="grow font-figtree font-normal text-gray-400 text-xs">
                    Prediction is calculated based on the water, weather, and soil condition
                </p>
            </div>

            
            <p className="mt-7 mb-3 font-figtree font-semibold text-xl text-black">Crop profit calculator</p>
            <div className="w-full flex flex-col items-start gap-3 bg-[#F2F7F2] py-5 px-5 rounded-lg drop-shadow-md">
                {/* Total Revenue Input */}
                <label className="font-figtree text-base text-black">Total Revenue:</label>
                <input
                    type="number"
                    value={totalRevenue}
                    onChange={(e) => setTotalRevenue(e.target.value)}
                    placeholder="Enter total revenue"
                    className="p-2 border rounded-lg w-full bg-[#F8FDF8]"
                />
                
                {/* Cost of Goods Sold Input */}
                <label className="font-figtree text-base text-black">Cost of Goods Sold:</label>
                <input
                    type="number"
                    value={costOfGoodsSold}
                    onChange={(e) => setCostOfGoodsSold(e.target.value)}
                    placeholder="Enter cost of goods sold"
                    className="p-2 border rounded-lg w-full bg-[#F8FDF8]"
                />
                
                {/* Calculate Button */}
                <button
                    onClick={calculateProfit}
                    className="mt-2 p-2 bg-primary-default text-white font-semibold rounded-lg"
                >
                    Calculate Profit
                </button>
                
                {/* Results */}
                {profit !== null && profitMargin !== null && (
                    <div className="mt-2">
                        <p className="font-figtree font-semibold text-base text-black">
                            Operating Profit: ${profit.toFixed(2)}
                        </p>
                        <p className="font-figtree font-semibold text-base text-black">
                            Operating Profit Margin: {profitMargin.toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-row w-full mt-3 gap-2 items-center">
                <InfoIcon className="text-gray-400" style={{ height: '16px', }} />
                <p className="grow font-figtree font-normal text-gray-400 text-xs">
                    Calculation formula from <a href='https://aglearninghub.com/operating-profit-margin-in-farm-financials/'><i><u>Operating Profit Margin in Farm Financials.</u></i> (2024, March 17). Ag Learning Hub. </a>
                </p>
            </div>
        </div>
    );
}

export default ResourceManagement;