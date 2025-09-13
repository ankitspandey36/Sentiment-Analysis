import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Upload as UploadIcon, 
  File, 
  CheckCircle, 
  AlertCircle,
  Download,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  name: string;
  size: number;
  status: "pending" | "processing" | "completed" | "error";
  progress: number;
  processedComments?: number;
  errors?: string[];
}

export default function Upload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      name: file.name,
      size: file.size,
      status: "pending",
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        simulateProcessing(file.name);
      }, index * 1000);
    });

    toast({
      title: "Files uploaded",
      description: `${fileList.length} file(s) added to processing queue`,
    });
  };

  const simulateProcessing = (fileName: string) => {
    setFiles(prev => prev.map(file => 
      file.name === fileName 
        ? { ...file, status: "processing" as const }
        : file
    ));

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => 
        file.name === fileName 
          ? { ...file, progress: Math.min(progress, 100) }
          : file
      ));

      if (progress >= 100) {
        clearInterval(interval);
        const isError = Math.random() < 0.1; // 10% chance of error
        
        setFiles(prev => prev.map(file => 
          file.name === fileName 
            ? { 
                ...file, 
                status: isError ? "error" as const : "completed" as const,
                progress: 100,
                processedComments: isError ? undefined : Math.floor(Math.random() * 200) + 50,
                errors: isError ? ["Invalid file format", "Missing required columns"] : undefined
              }
            : file
        ));

        if (!isError) {
          toast({
            title: "Processing completed",
            description: `${fileName} has been successfully analyzed`,
          });
        }
      }
    }, 500);
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "processing":
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <File className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: UploadedFile["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="sentiment-positive">Completed</Badge>;
      case "error":
        return <Badge className="sentiment-negative">Error</Badge>;
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Upload Comments</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Upload CSV, Excel, or JSON files containing stakeholder comments for analysis
        </p>
      </motion.div>

      {/* Upload Area */}
      <Card className="analytics-card">
        <CardContent className="pt-4 sm:pt-6">
          <div
            className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center transition-all duration-200 ${
              isDragging 
                ? "border-primary bg-primary/5 scale-105" 
                : "border-border hover:border-primary/50 hover:bg-accent/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Drop your files here, or click to browse
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Support for CSV, Excel (.xlsx), and JSON files up to 50MB
            </p>
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Requirements */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Required columns:</strong> comment_id, stakeholder_type, clause_section, comment_text.
          Optional: submission_date, contact_info
        </AlertDescription>
      </Alert>

      {/* Upload Queue */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span>Processing Queue ({files.length} files)</span>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-2">
                  <Pause className="h-3 w-3" />
                  <span className="hidden sm:inline">Pause All</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <RotateCcw className="h-3 w-3" />
                  <span className="hidden sm:inline">Retry Failed</span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-border rounded-lg"
                >
                  {getStatusIcon(file.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <h4 className="font-medium truncate">{file.name}</h4>
                      {getStatusBadge(file.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.processedComments && (
                        <span>{file.processedComments} comments processed</span>
                      )}
                    </div>
                    {file.status === "processing" && (
                      <Progress value={file.progress} className="mt-2" />
                    )}
                    {file.errors && (
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        Errors: {file.errors.join(", ")}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                    {file.status === "completed" && (
                      <Button variant="ghost" size="sm">
                        View Results
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}