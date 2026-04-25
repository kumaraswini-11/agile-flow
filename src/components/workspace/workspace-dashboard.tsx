import { formatDate } from "date-fns"
import { Badge } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import useAuthStore from "@/store"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card"
import { Button } from "../ui/button"


export const WorkspaceDashboard = () => {
  const { workspaceId } = useParams({ from: "/workspace/:workspaceId" })
  const { user } = useAuthStore()
  const { currentWorkspace, projects, tasks, members, fetchProjects, fetchTasks, fetchMembers } = useWorkspaceStore()

  useEffect(() => {
    if (workspaceId) {
      fetchProjects(workspaceId)
      fetchTasks(workspaceId)
      fetchMembers(workspaceId)
    }
  }, [workspaceId, fetchProjects, fetchTasks, fetchMembers])

  // For demo purposes, create some mock data if the API calls don't return data
  const projectsToShow =
    projects.length > 0
      ? projects
      : [
          {
            id: "1",
            name: "Website Redesign",
            workspaceId: workspaceId || "default",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Mobile App Development",
            workspaceId: workspaceId || "default",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]

  const tasksToShow =
    tasks.length > 0
      ? tasks
      : [
          {
            id: "1",
            title: "Design homepage",
            status: "in-progress" as const,
            priority: "high" as const,
            workspaceId: workspaceId || "default",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Implement authentication",
            status: "todo" as const,
            priority: "medium" as const,
            workspaceId: workspaceId || "default",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Write documentation",
            status: "done" as const,
            priority: "low" as const,
            workspaceId: workspaceId || "default",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]

  const membersToShow =
    members.length > 0
      ? members
      : [
          {
            id: "1",
            userId: user?.id || "1",
            workspaceId: workspaceId || "default",
            role: "owner" as const,
            user: {
              id: user?.id || "1",
              name: user?.name || "You",
              email: user?.email || "you@example.com",
              createdAt: new Date().toISOString(),
            },
            joinedAt: new Date().toISOString(),
          },
          {
            id: "2",
            userId: "2",
            workspaceId: workspaceId || "default",
            role: "member" as const,
            user: { id: "2", name: "Team Member", email: "member@example.com", createdAt: new Date().toISOString() },
            joinedAt: new Date().toISOString(),
          },
        ]

  const tasksByStatus = {
    todo: tasksToShow.filter((task) => task.status === "todo").length,
    inProgress: tasksToShow.filter((task) => task.status === "in-progress").length,
    done: tasksToShow.filter((task) => task.status === "done").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to {currentWorkspace?.name || 'your workspace'}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsToShow.length}</div>
              <p className="text-xs text-muted-foreground">
                Active projects in this workspace
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks To Do</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksByStatus.todo}</div>
              <p className="text-xs text-muted-foreground">
                Tasks waiting to be started
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.3}}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasksByStatus.inProgress}</div>
              <p className="text-xs text-muted-foreground">
                Tasks currently in progress
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{membersToShow.length}</div>
              <p className="text-xs text-muted-foreground">
                People working in this workspace
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your most recently updated projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectsToShow.map(project => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Updated {formatDate(project.updatedAt)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>
                Your most recently updated tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasksToShow.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center">
                    <div className={cn(
                      "mr-2 h-2 w-2 rounded-full",
                      task.status === 'todo' ? "bg-yellow-500" :
                      task.status === 'in-progress' ? "bg-blue-500" :
                      "bg-green-500"
                    )} />
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.status === 'todo' ? 'To Do' :
                         task.status === 'in-progress' ? 'In Progress' :
                         'Completed'}
                      </p>
                    </div>
                    <Badge variant={
                      task.priority === 'high' ? "destructive" :
                      task.priority === 'medium' ? "default" :
                      "secondary"
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

  )

}
