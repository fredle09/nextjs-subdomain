import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="bg-card border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-6">
              Welcome to the admin panel! You have successfully logged in.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">User Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage user accounts and permissions
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Content Management</h3>
                <p className="text-sm text-muted-foreground">
                  Create and edit blog posts and pages
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  View site statistics and performance
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure site settings and preferences
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button asChild>
                <Link href="/admin/login">
                  Back to Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
