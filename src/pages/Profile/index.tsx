import { useEffect, useState } from 'react';
import avatar from '@/assets/images/avatar.png'
import loc from '@/assets/icons/loc.svg'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { UserApi, FieldApi } from '@/api';
import useAuth from "@/contexts/AuthContext";
import { CropResponse } from "@/types";
import { getUserIdFromToken } from "@/utils/jwt-util";

function Profile() {
    const { token, logout } = useAuth();
    const [userData, setUserData] = useState({
        name: 'Farmer Name',
        email: 'email@gmail.com',
        location: 'Coblong, Bandung',
    });

    const [fields, setFields] = useState<CropResponse[]>([]);
    const handleLogout = () => {
        // Basically calling logout
        logout();
        window.location.href = "/";
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const user = await UserApi.getSelf();
                    setUserData({
                        name: user.name || 'Farmer Name',
                        email: user.email || 'email@gmail.com',
                        location: user.location || 'Coblong, Bandung',
                    });
                    const userId = getUserIdFromToken(token);

                    if (userId) {

                        const fieldData = await FieldApi.getFieldById(userId);
                        setFields(fieldData);
                    } else {
                        console.error("Failed to decode userId from token.");
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };
        fetchProfile();
    }, [token]);

    const handleStatusChange = async (id: number, status: string) => {
        try {
            await FieldApi.updateFieldStatus(id, status);
            setFields(fields.map(field => field.id === id ? { ...field, status } : field));
        } catch (error) {
            console.error('Error updating field status:', error);
        }
    };

    return (
        <div className="w-screen bg-bg-custom-gradient flex flex-col px-10 py-12 items-center">
            <div className='flex w-full justify-end mb-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='p-0 focus:ring-0 ring-0'>
                            <MoreVertical style={{ strokeWidth: 3 }} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute right-0 w-fit bg-white px-5 py-2 rounded-lg ring-0 focus:ring-0 drop-shadow-md">
                        <DropdownMenuLabel onClick={handleLogout}>Logout</DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div
                className="w-32 h-32 rounded-full overflow-hidden relative"
                style={{
                    background: 'linear-gradient(0deg, #E16C1A, #F9E6D9)',
                    padding: '5px',
                    borderRadius: '50%',
                }}
            >
                <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div className='flex flex-col items-center mt-4 gap-2'>
                <p className='font-figtree font-semibold text-3xl text-black'>{userData.name}</p>
                <p className='font-figtree font-normal text-base text-black'>{userData.email}</p>
                <div className='flex flex-row gap-1'>
                    <img src={loc} className='w-3' />
                    <p className='font-figtree font-bold text-md text-primary-default'>{userData.location}</p>
                </div>
            </div>

            <div className='flex flex-row w-full mt-14 mb-4 items-center'>
                <p className='grow font-figtree font-semibold text-xl text-black'>My Field</p>
                <Button className='bg-primary-default text-white rounded-lg font-figtree font-medium'>+ Add</Button>
            </div>

            <div className='flex flex-col gap-3 w-full mb-20 h-80 overflow-y-auto'>
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <div key={field.id} className='flex flex-col gap-1 px-5 py-3 w-full rounded-xl bg-[#F2F7F2] drop-shadow-md'>
                            <div className='flex flex-row w-full items-center'>
                                <div className='grow flex flex-row gap-4 items-center'>
                                    <p className='font-figtree font-bold text-xl text-primary-default'>{field.cropName}</p>
                                    {
                                        field.status === "fail" ? (
                                            <>
                                                <div className={`bg-secondary-default h-fit py-0.5 px-1.5 rounded-md font-figtree font-medium text-sm text-white`}>
                                                    {field.status}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`bg-primary-default h-fit py-0.5 px-1.5 rounded-md font-figtree font-medium text-sm text-white`}>
                                                    {field.status}
                                                </div>
                                            </>
                                        )
                                    }
                                    
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='p-0 m-0 focus:ring-0 ring-0'>
                                            <MoreVertical style={{ height: '16px', strokeWidth: 2 }} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="absolute right-0 w-fit bg-white px-5 py-2 rounded-lg ring-0 focus:ring-0 drop-shadow-md">
                                        {field.status === "planting" ? (
                                            <>
                                                <DropdownMenuLabel className="whitespace-nowrap m-1" onClick={() => handleStatusChange(field.id, "harvest")}>Harvest</DropdownMenuLabel>
                                                <DropdownMenuLabel className="whitespace-nowrap m-1" onClick={() => handleStatusChange(field.id, "fail")}>Crop failure</DropdownMenuLabel>
                                            </>
                                        ) : (
                                            <DropdownMenuLabel className="whitespace-nowrap m-1" onClick={() => handleStatusChange(field.id, "planting")}>Replant</DropdownMenuLabel>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className='flex flex-row w-full'>
                                <p className='grow font-figtree font-normal text-base text-black'>Planting date</p>
                                <p className='font-figtree font-semibold text-base text-black'>{field.plantDate}</p>
                            </div>
                            <div className='flex flex-row w-full'>
                                <p className='grow font-figtree font-normal text-base text-black'>Area</p>
                                <p className='font-figtree font-semibold text-base text-black'>{field.area} m²</p>
                            </div>
                            <div className='flex flex-row w-full'>
                                <p className='grow font-figtree font-normal text-base text-black'>Soil type</p>
                                <p className='font-figtree font-semibold text-base text-black'>{field.soilType}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No fields found.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;