const Task=require('../models/Task');

const createTask=async(req,res)=>{
    try {
        const newTask=new Task(req.body);
        const exp=await newTask.save();
        return res.status(200).json(exp);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAllTasks=async(req,res)=>{
    try {
        const tasks=await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getTaskById=async(req,res)=>{
    try {
        const task=await Task.findById(req.params.id);
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getTasksByCategory = async (req, res) => {
    try {
      const category = req.query.category.toString();
  
      // Validate category (optional, depending on your requirements)
      if (!category) {
        return res.status(400).json({ error: 'Category is required in the query parameters' });
      }
  
      // Fetch expenses for the specified category
      const tasks = await Task.find({ category });
  
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getTasksByUser=async(req,res)=>{
    const user=req.params.id;
    try {
        if(!user)return res.status(500).json("Unauthorized user");

        const tasks=await Task.find({user:user});
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({message:error});
    }
  }

const updateTask=async(req,res)=>{
    const {title,category,description,due,status}=req.body;
    const taskId=req.params.id;

    try {
        // if(user==null)return res.status(500).json({message:"Please Login to update your expense"});

        const task=await Task.findById({_id:taskId});
        if(!task) {
            return res.status(404).json("Task not found");
        }
        
        const updatedTask=await Task.findByIdAndUpdate(task._id,{
            title,category,description,due,status
        },{new:true})

        return res.status(200).json(updateTask);
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

const deleteTasks=async(req,res)=>{
    const user=req.session.user || null;
    const taskId=req.params.id;

    try {
        const task=await Task.findById({_id:taskId});
        if(!task) {
            return res.status(404).json("Task not found");
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({ message: 'Task has been deleted successfully' });
    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports={
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTasks,
    getTasksByCategory,
    getTasksByUser,
}