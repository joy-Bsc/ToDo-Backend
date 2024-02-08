const { response } = require('express');
const ToDoListModel = require('../models/ToDoLIstModel');
const jwt =require('jsonwebtoken');

exports.CreateToDo=async(req,res)=>{
    try {
        let reqBody = req.body;
        let TodoSubject = reqBody.TodoSubject;
        let TodoDescription = reqBody.TodoDescription;
        let userName = req.headers.UserName;
        
        let TodoStatus ="New";
        let TodoCreateDate = Date.now();
        let TodoUpdateDate=Date.now();
        let PostBody={
            
                UserName:userName,
                TodoSubject:TodoSubject,
                TodoDescription:TodoDescription,
                TodoStatus:TodoStatus,
                TodoCreateDate:TodoCreateDate,
                TodoUpdateDate:TodoUpdateDate
        }
        const data = await ToDoListModel.create(PostBody);
        if(data){
            res.status(200).json({status:"success",data:data})
        }
        else{
            res.status(400).json({status:"Fail",data:e})
        }
    } catch (error) {
        console.log(error);
    }
    
    
}


exports.SelectToDo= async (req, res) => {
    try {
        let UserName = req.headers.UserName;

        const response = await ToDoListModel.find({ UserName });

        if (response && response.length > 0) {
            res.status(200).json({ status: "success", data: response });
        } else {
            res.status(404).json({ status: "fail", message: "Profile not found" });
        }
    } catch (error) {
        console.error("Error in SelectProfile:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }

};

exports.UpdateToDo=async(req,res)=>{
try {
    let TodoSubject = req.body.TodoSubject;
    let TodoDescription = req.body.TodoDescription;
    let _id=req.body._id;
    let TodoUpdateDate=Date.now();
    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }
    const updated =await ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true})
    if (updated) {
        res.status(200).json({status:"Success",data:updated})
    } else {
        res.status(400).json({status:"unauthorized"})
        
    }
} catch (error) {
    res.status(400).json({status:"error",data:error})  
}
}

exports.UpdateToDoStatus=async(req,res)=>{
    try {
        
        let TodoStatus = req.body.TodoStatus;
        let _id=req.body._id;
        let TodoUpdateDate=Date.now();
        let PostBody={
            TodoStatus:TodoStatus,
            TodoUpdateDate:TodoUpdateDate
        }
        const updated =await ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true})
        if (updated) {
            res.status(200).json({status:"Success",data:updated})
        } else {
            res.status(400).json({status:"unauthorized"})
            
        }
    } catch (error) {
        res.status(400).json({status:"error",data:error})  
    }
    }

    exports.RemoveToDo=async(req,res)=>{
        try {
            let _id = req.body._id;
            const deleted = await ToDoListModel.deleteOne({ _id: _id });
            
            if(deleted.deletedCount > 0){
                res.status(200).json({status:"Success",data:deleted})
        } else {
            res.status(400).json({status:"unauthorized"})
            }
        } catch (error) {
            res.status(400).json({status:"error",data:error})
        }
    }

    exports.SelectToDoByStatus= async (req, res) => {
        try {
            let UserName = req.headers.UserName;
            let TodoStatus = req.body.TodoStatus;
    
            const response = await ToDoListModel.find({ UserName: UserName, TodoStatus: TodoStatus });
    
            if (response && response.length > 0) {
                res.status(200).json({ status: "success", data: response });
            } else {
                res.status(404).json({ status: "fail", message: "Profile not found" });
            }
        } catch (error) {
            console.error("Error in SelectProfile:", error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    
    };

    exports.SelectToDoByDate = async (req, res) => {
        try {
            let UserName = req.headers.UserName;
            let FromDate = req.body.FromDate;
            let ToDate = req.body.ToDate;
    
            // Validate date formats
            if (!isValidDate(FromDate) || !isValidDate(ToDate)) {
                return res.status(400).json({ status: "fail", message: "Invalid date format" });
            }
    
            const getDate = await ToDoListModel.find({
                UserName: UserName,
                TodoCreateDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) }
                
            });
            console.log(getDate+"errr");
            if (getDate && getDate.length > 0) {
                res.status(200).json({ status: "success", data: response });
            } else {
                res.status(404).json({ status: "fail", message: "ToDo items not found" });
            }
        } catch (error) {
            console.error("Error in SelectToDoByDate:", error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    };
    
    // Function to check if a value is a valid date
    function isValidDate(dateString) {
        return dateString instanceof Date && !isNaN(dateString);
    }