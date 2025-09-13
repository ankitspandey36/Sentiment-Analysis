import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Database, 
  Bot, 
  Shield, 
  Bell,
  Users,
  Download,
  Trash2,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Configure analysis parameters, notifications, and system preferences
        </p>
      </motion.div>

      {/* AI Model Settings */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
              <Input 
                id="confidence-threshold" 
                type="number" 
                defaultValue="0.75" 
                min="0" 
                max="1" 
                step="0.05"
              />
              <p className="text-xs text-muted-foreground">
                Minimum confidence score for automatic classification
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch-size">Batch Processing Size</Label>
              <Input 
                id="batch-size" 
                type="number" 
                defaultValue="100" 
                min="10" 
                max="1000"
              />
              <p className="text-xs text-muted-foreground">
                Number of comments processed simultaneously
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-flagging">Automatic Flagging</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically flag low-confidence predictions for human review
                </p>
              </div>
              <Switch id="auto-flagging" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="keyword-extraction">Enhanced Keyword Extraction</Label>
                <p className="text-sm text-muted-foreground">
                  Use advanced NLP techniques for better keyword identification
                </p>
              </div>
              <Switch id="keyword-extraction" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sentiment-fine-tuning">Fine-tuned Sentiment Analysis</Label>
                <p className="text-sm text-muted-foreground">
                  Apply domain-specific model adaptations for government consultations
                </p>
              </div>
              <Switch id="sentiment-fine-tuning" defaultChecked />
            </div>
          </div>

          <Alert>
            <Bot className="h-4 w-4" />
            <AlertDescription>
              Model performance: <Badge className="sentiment-positive ml-1">94.2% accuracy</Badge>
              <Button variant="link" className="h-auto p-0 ml-2">
                View detailed metrics
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">247</div>
              <p className="text-sm text-muted-foreground">Total Comments</p>
              <Badge variant="secondary" className="mt-1">Active</Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">1.2 GB</div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
              <Badge variant="secondary" className="mt-1">15% of limit</Badge>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">5</div>
              <p className="text-sm text-muted-foreground">Data Sources</p>
              <Badge className="sentiment-positive mt-1">Connected</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Automatic Backups</Label>
                <p className="text-sm text-muted-foreground">
                  Daily automated backups of analysis results and configurations
                </p>
              </div>
              <Switch id="auto-backup" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-retention">Data Retention (days)</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically archive old analysis results
                </p>
              </div>
              <Input className="w-20" defaultValue="365" type="number" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export All Data
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync Database
            </Button>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Purge Old Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security & Access */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Require 2FA for all administrator accounts
                </p>
              </div>
              <Switch id="two-factor" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="api-access">API Access Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Log all API requests for audit purposes
                </p>
              </div>
              <Switch id="api-access" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="encryption">Data Encryption at Rest</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt stored comment data and analysis results
                </p>
              </div>
              <Badge className="sentiment-positive">Enabled</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Active Sessions</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">Admin Console</p>
                  <p className="text-sm text-muted-foreground">Current session • Chrome on Windows</p>
                </div>
                <Badge className="sentiment-positive">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">API Access</p>
                  <p className="text-sm text-muted-foreground">Last used 2 hours ago • Analytics Dashboard</p>
                </div>
                <Button variant="outline" size="sm">Revoke</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="processing-alerts">Processing Completion Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notify when batch processing completes
              </p>
            </div>
            <Switch id="processing-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="error-alerts">Error Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Alert for processing errors and system issues
              </p>
            </div>
            <Switch id="error-alerts" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-reports">Weekly Summary Reports</Label>
              <p className="text-sm text-muted-foreground">
                Automated weekly analytics summary via email
              </p>
            </div>
            <Switch id="weekly-reports" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notification-email">Notification Email</Label>
            <Input 
              id="notification-email" 
              type="email" 
              defaultValue="admin@gov.ca" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}