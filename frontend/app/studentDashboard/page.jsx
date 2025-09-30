"use client";
import ViewAnnouncement from '../teacherDashboard/viewAnnouncements/page'
import { useRouter } from "next/navigation";



const page = () => {

  const router=useRouter();

const view=()=>{
 router.push('/studentDashboard/viewAnnouncement');
}

  return (
    <div>this is student dashboard
      <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-[200px]">
        <button onClick={view}>view announcements</button>
      </div>
    </div>
  )
}

export default page