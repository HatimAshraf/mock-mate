import Addnewinterview from './_components/Addnewinterview';
import InterviewList from './_components/InterviewList';

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-primary text-2xl'>Dashboard</h2>
      <h2 className='font-medium '>
        Prepare and Start your AI Mockup Interview
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <Addnewinterview />
      </div>
      <InterviewList />
    </div>
  );
}

export default Dashboard;
