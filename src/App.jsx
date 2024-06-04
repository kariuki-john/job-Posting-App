import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import HomePage from "./components/Pages/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import JobsPage from "./components/Pages/JobsPage";
import AddJobPage from "./components/Pages/AddJobPage";
import JobPage ,{jobLoader}from "./components/Pages/JobPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import EditJobPage from "./components/Pages/EditJobPage";


const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newJob)
    })
    return;
    }
     
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;

  };
  
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(  
         <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />}loader={jobLoader} />
        <Route path='/edit-job/:id' element={< EditJobPage updateJobSubmit={updateJob}/>}loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
export default App;
