import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logos/logo_square_default.svg";
import { Loader2 } from 'lucide-react';
import useAuth from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { CropData, KYCResponse } from '@/types';
import { AuthApi } from '@/api';

const KYC = () => {
    const { id } = useParams<{ id: string }>();
    const { update, setUpdate, isAuthenticated } = useAuth();
    const [fields, setFields] = useState<CropData[]>([]);
    const [newField, setNewField] = useState<CropData>({
        cropName: '',
        area: 0,
        soilType: '',
        plantDate: ''
    });
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({
        cropName: '',
        area: '',
        soilType: '',
        plantDate: '',
        location: ''
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleLanding = () => {
        navigate("/");
    };

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }

        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    // Validate field input
    const validateField = () => {
        const newErrors = { cropName: '', area: '', soilType: '', plantDate: '', location: '' };
        let isValid = true;

        if (!newField.cropName.trim()) {
            newErrors.cropName = "Crop type is required.";
            isValid = false;
        }

        if (newField.area <= 0) {
            newErrors.area = "Area must be greater than 0.";
            isValid = false;
        }

        if (!newField.soilType.trim()) {
            newErrors.soilType = "Soil type is required.";
            isValid = false;
            console.log("done");
        }

        const today = new Date().toISOString().split('T')[0];
        if (!newField.plantDate || newField.plantDate < today) {
            newErrors.plantDate = "Planting date must be today or later.";
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
            setNewField({ cropName: '', area: 0, soilType: '', plantDate: '' });
            setErrors({ cropName: '', area: '', soilType: '', plantDate: '', location: '' });  // Clear errors after adding
            setIsDialogOpen(false);
        }
    };

    // Input change handler for field data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CropData) => {
        const value = field === 'area' ? Number(e.target.value) : e.target.value;
        setNewField({
            ...newField,
            [field]: value
        });
    };

    // Handle form submission
    const handleSubmit = async() => {
        try {
            if (fields.length === 0) {
                alert("You must add at least one field.");
                return;
            }
        
            const data = {
                userId: Number(id), // Convert the id string to a number
                location,
                fields
            };
            setUpdate(true);

            // Submit the response
            const submitResponse: KYCResponse = await AuthApi.kyc(data);
            console.log("KYC response:", submitResponse);
            if (submitResponse.location) {
                toast.success("Data insrted successful.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Submit error:", error);
            const err = error as AxiosError;
            toast.error((err.response?.data as { message: string })?.message || 'Server is unreachable. Please try again later.');
        } finally {
            setUpdate(false);
        }
    };    

    return (
        <main className="flex flex-row w-[100vw] min-h-screen justify-center items-center bg-gradient-to-tr from-primary-default/[0.4] to-white">
            <div className="flex flex-col w-full gap-3 px-10 mt-32 mb-10">
                <img src={logo} alt="logo" onClick={handleLanding} className="absolute top-10 left-10 z-20 h-12 transition-transform duration-300 transform hover:scale-105" />
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
                    <p className="block text-sm font-medium">Your Fields</p>
                    {fields.length === 0 ? (
                        <p className="text-gray-500">No fields registered</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 max-h-72 overflow-y-auto">
                            {fields.map((field, index) => (
                                <div key={index} className="border rounded-xl p-4 bg-white shadow-md">
                                    <h4 className="font-semibold text-lg">{field.cropName}</h4>
                                    <p>Area: {field.area} ha</p>
                                    <p>Soil Type: {field.soilType}</p>
                                    <p>Planting Date: {new Date(field.plantDate).toLocaleDateString()}</p>
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
                                        value={newField.cropName}
                                        onChange={(e) => handleInputChange(e, 'cropName')}
                                        className={`w-full rounded-xl h-12 ${errors.cropName ? 'border-red-500' : ''}`}
                                    />
                                    {errors.cropName && <p className="text-red-500 text-sm">{errors.cropName}</p>}
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
                                        value={newField.plantDate}
                                        onChange={(e) => handleInputChange(e, 'plantDate')}
                                        className={`w-full rounded-xl h-12 ${errors.plantDate ? 'border-red-500' : ''}`}
                                        type="date"
                                    />
                                    {errors.plantDate && <p className="text-red-500 text-sm">{errors.plantDate}</p>}
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