import avatar from '@/assets/images/avatar.png'
import loc from '@/assets/icons/loc.svg'
import { Button } from '@/components/ui/button'
import logoutIcon from '@/assets/icons/logout.svg'
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

function Profile() {
    return (
        <div className="w-screen h-screen bg-bg-custom-gradient flex flex-col px-10 py-12 items-center">
            <div className='flex w-full justify-end mb-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='p-0 focus:ring-0 ring-0'>
                            <MoreVertical style={{ strokeWidth: 3 }} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute right-0 w-fit bg-white px-5 py-2 rounded-lg ring-0 focus:ring-0 drop-shadow-md">
                        <DropdownMenuLabel>Logout</DropdownMenuLabel>
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
                <p className='font-figtree font-semibold text-3xl text-black'>Farmer Name</p>
                <p className='font-figtree font-normal text-base text-black'>email@gmail.com</p>
                <div className='flex flex-row gap-1'>
                    <img src={loc} className='w-3' />
                    <p className='font-figtree font-bold text-md text-primary-default'>Coblong, Bandung</p>
                </div>
            </div>

            <div className='flex flex-row w-full mt-14 mb-4 items-center'>
                <p className='grow font-figtree font-semibold text-xl text-black'>My Field</p>
                <Button className='bg-primary-default text-white rounded-lg font-figtree font-medium'>+ Add</Button>
            </div>

            <div className='flex flex-col gap-3 w-full mb-20'>
                <div className='flex flex-col gap-1 px-5 py-3 w-full rounded-xl bg-[#F2F7F2] drop-shadow-md'>
                    <div className='flex flex-row w-full items-center'>
                        <div className='grow flex flex-row gap-4 items-center'>
                            <p className='font-figtree font-bold text-xl text-primary-default'>Corn</p>
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
                        <p className='font-figtree font-semibold text-base text-black'>30/09/2024</p>
                    </div>
                    <div className='flex flex-row w-full'>
                        <p className='grow font-figtree font-normal text-base text-black'>Area</p>
                        <p className='font-figtree font-semibold text-base text-black'>4.00 ha</p>
                    </div>
                    <div className='flex flex-row w-full'>
                        <p className='grow font-figtree font-normal text-base text-black'>Soil type</p>
                        <p className='font-figtree font-semibold text-base text-black'>Sand</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;