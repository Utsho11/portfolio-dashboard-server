import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.services";

const createProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.createProjectIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Project created successfully",
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.updateProjectIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project updated successfully",
    data: project,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const projects = await ProjectServices.getAllProjectsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Projects are retrieved successfully",
    data: projects,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.getProjectByIdFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project is retrieved successfully",
    data: project,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.deleteProjectFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project is deleted successfully",
    data: project,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
};
