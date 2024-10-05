import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logos/logo_square_default.svg";
import { Loader2 } from 'lucide-react';
import useAuth from '@/contexts/AuthContext';

interface Field {
  cropType: string;
  area: number;
  soilType: string;
  plantingDate: string;
}

const KYC = () => {
    const { update, setUpdate } = useAuth();
    const [fields, setFields] = useState<Field[]>([]);
    const [newField, setNewField] = useState<Field>({
        cropType: '',
        area: 0,
        soilType: '',
        plantingDate: ''
    });
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({
        cropType: '',
        area: '',
        soilType: '',
        plantingDate: '',
        location: ''
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Validate field input
    const validateField = () => {
        const newErrors = { cropType: '', area: '', soilType: '', plantingDate: '', location: '' };
        let isValid = true;

        if (!newField.cropType.trim()) {
            newErrors.cropType = "Crop type is required.";
            isValid = false;
        }

        if (newField.area <= 0) {
            newErrors.area = "Area must be greater than 0.";
            isValid = false;
        }

        if (!newField.soilType.trim()) {
            newErrors.soilType = "Soil type is required.";
            isValid = false;
        }

        const today = new Date().toISOString().split('T')[0];
        if (!newField.plantingDate || newField.plantingDate < today) {
            newErrors.plantingDate = "Planting date must be today or later.";
            isValid = false;
        }

        if (!location.trim() && !isDialogOpen) {
            newErrors.location = "Location is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle adding a new field
    const handleAddField = () => {
        if (validateField()) {
            setFields([...fields, newField]);
            setNewField({ cropType: '', area: 0, soilType: '', plantingDate: '' });
            setErrors({ cropType: '', area: '', soilType: '', plantingDate: '', location: '' });  // Clear errors after adding
            setIsDialogOpen(false);
        }
    };

    // Input change handler for field data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Field) => {
        const value = field === 'area' ? Number(e.target.value) : e.target.value;
        setNewField({
            ...newField,
            [field]: value
        });
    };

    // Handle form submission
    const handleSubmit = () => {
        if (fields.length === 0) {
            alert("You must add at least one field.");
            return;
        }

        const data = {
            location,
            fields
        };

        // Simulate API call by logging the data to console
        console.log("Prepared Data for API:", data);
        setUpdate(true);  // To disable the button while processing
    };

    return (
        <main className="flex flex-row w-[100vw] min-h-screen justify-center items-center bg-gradient-to-tr from-primary-default/[0.4] to-white">
            <div className="flex flex-col w-full gap-3 px-10 mt-32 mb-10">
                <img src={logo} alt="logo" className="absolute top-10 left-10 z-20 h-12" />
                <p className="font-figtree text-5xl font-semibold">Tell me about your field!</p>
                <p className="font-figtree text-lg font-normal">Give us better information about your farm!</p>

                {/* Location field */}
                <div className='space-y-2'>
                    <div className='text-sm font-semibold'>Location</div>
                    <Input
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`w-full rounded-xl h-12 ${errors.location ? 'border-red-500' : ''}`}
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                </div>

                {/* List of fields */}
                <div className="mb-4 space-y-2">
                    <label className="block text-sm font-medium">Your Fields</label>
                    {fields.length === 0 ? (
                        <p className="text-gray-500">No fields registered</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 h-72 overflow-y-auto">
                            {fields.map((field, index) => (
                                <div key={index} className="border rounded-xl p-4 bg-white shadow-md">
                                    <h4 className="font-semibold text-lg">{field.cropType}</h4>
                                    <p>Area: {field.area} ha</p>
                                    <p>Soil Type: {field.soilType}</p>
                                    <p>Planting Date: {new Date(field.plantingDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add button */}
                <div className="flex justify-end">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary-default hover:bg-primary-dark text-white px-6 text-lg py-2 rounded-full">+ Add</Button>
                        </DialogTrigger>

                        {/* Popup Dialog */}
                        <DialogContent className='px-6 rounded-3xl'>
                            <DialogTitle className='text-2xl font-bold text-primary-default'>Add Crop</DialogTitle>
                            <div className="space-y-4">
                                <div className='space-y-1.5'>
                                    <div className='text-sm font-semibold'>Crop Type</div>
                                    <Input
                                        placeholder="Enter crop type..."
                                        value={newField.cropType}
                                        onChange={(e) => handleInputChange(e, 'cropType')}
                                        className={`w-full rounded-xl h-12 ${errors.cropType ? 'border-red-500' : ''}`}
                                    />
                                    {errors.cropType && <p className="text-red-500 text-sm">{errors.cropType}</p>}
                                </div>
                                <div className='space-y-1.5'>
                                    <div className='text-sm font-semibold'>Area</div>
                                    <Input
                                        placeholder="Enter area in ha"
                                        value={newField.area || ''}
                                        onChange={(e) => handleInputChange(e, 'area')}
                                        className={`w-full rounded-xl h-12 ${errors.area ? 'border-red-500' : ''}`}
                                        type="number"
                                    />
                                    {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                                </div>
                                <div className='space-y-1.5'>
                                    <div className='text-sm font-semibold'>Soil Type</div>
                                    <Input
                                        placeholder="Enter soil type"
                                        value={newField.soilType}
                                        onChange={(e) => handleInputChange(e, 'soilType')}
                                        className={`w-full rounded-xl h-12 ${errors.soilType ? 'border-red-500' : ''}`}
                                    />
                                    {errors.soilType && <p className="text-red-500 text-sm">{errors.soilType}</p>}
                                </div>
                                <div className='space-y-1.5'>
                                    <div className='text-sm font-semibold'>Planting date</div>
                                    <Input
                                        placeholder="Enter planting date"
                                        value={newField.plantingDate}
                                        onChange={(e) => handleInputChange(e, 'plantingDate')}
                                        className={`w-full rounded-xl h-12 ${errors.plantingDate ? 'border-red-500' : ''}`}
                                        type="date"
                                    />
                                    {errors.plantingDate && <p className="text-red-500 text-sm">{errors.plantingDate}</p>}
                                </div>
                                <Button className="w-full py-2 mt-8 text-lg bg-primary-default text-white rounded-full hover:bg-primary-dark transition-transform duration-300 transform hover:scale-105" onClick={handleAddField}>
                                    Save
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Complete Setup Button */}
                <div className="mt-6">
                    <Button type="submit" className="w-full py-3 text-lg bg-primary-default text-white rounded-full hover:bg-primary-dark transition-transform duration-300 transform hover:scale-105" onClick={handleSubmit}>
                        Complete Setup {update && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default KYC;