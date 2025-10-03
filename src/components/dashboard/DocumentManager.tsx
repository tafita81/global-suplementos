import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Download, ExternalLink, Trash2, ArrowUp, ArrowDown, Star, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CompanyDocument {
  id: string;
  document_type: string;
  document_name: string;
  file_path: string;
  file_size: number;
  content_type: string;
  uploaded_at: string;
  priority?: number;
  usage_instructions?: string;
  auto_use_for?: string[];
}

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');

  useEffect(() => {
    loadDocuments();
    uploadFloridaCertificate();
  }, []);

  const loadDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('company_documents')
        .select('*')
        .eq('ein_number', '33-3939483')
        .order('priority', { ascending: false })
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: CompanyDocument[] = (data || []).map(doc => ({
        ...doc,
        auto_use_for: Array.isArray(doc.auto_use_for) ? doc.auto_use_for.map(String) : []
      }));
      
      setDocuments(transformedData);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFloridaCertificate = async () => {
    try {
      // Check if Florida certificate already exists
      const { data: existing } = await supabase
        .from('company_documents')
        .select('id')
        .eq('ein_number', '33-3939483')
        .eq('document_type', 'incorporation_certificate')
        .eq('document_name', 'florida-certificate.jpeg');

      if (existing && existing.length > 0) {
        console.log('Florida certificate already exists');
        return;
      }

      // Fetch the certificate file and convert to base64
      const response = await fetch('/documents/florida-certificate.jpeg');
      const blob = await response.blob();
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('document-upload', {
          body: {
            ein_number: '33-3939483',
            document_type: 'incorporation_certificate',
            document_name: 'florida-certificate.jpeg',
            file_data: base64Data,
            content_type: 'image/jpeg'
          }
        });

        if (error) {
          console.error('Error uploading Florida certificate:', error);
        } else {
          console.log('Florida certificate uploaded successfully');
          loadDocuments();
        }
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error processing Florida certificate:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !documentType || !documentName) {
      toast.error('Please fill in all fields and select a file');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('document-upload', {
          body: {
            ein_number: '33-3939483',
            document_type: documentType,
            document_name: `${documentName}.${selectedFile.name.split('.').pop()}`,
            file_data: base64Data,
            content_type: selectedFile.type
          }
        });

        if (error) {
          throw error;
        }

        toast.success('Document uploaded successfully!');
        setSelectedFile(null);
        setDocumentType('');
        setDocumentName('');
        loadDocuments();
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Error uploading document');
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: CompanyDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('company-documents')
        .download(document.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.document_name;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.error('Error downloading document');
    }
  };

  const deleteDocument = async (document: CompanyDocument) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('company-documents')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete record
      const { error: recordError } = await supabase
        .from('company_documents')
        .delete()
        .eq('id', document.id);

      if (recordError) throw recordError;

      toast.success('Document removed successfully!');
      loadDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error removing document');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeLabel = (type: string): string => {
    const types: { [key: string]: string } = {
      'incorporation_certificate': 'Incorporation Certificate',
      'ein_document': 'EIN Document',
      'business_license': 'Business License',
      'tax_document': 'Tax Document',
      'bank_statement': 'Bank Statement',
      'utility_bill': 'Utility Bill',
      'other': 'Others'
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Documents...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Document Upload
          </CardTitle>
          <CardDescription>
            Add company documents that will be used in automatic registrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incorporation_certificate">Incorporation Certificate</SelectItem>
                  <SelectItem value="ein_document">EIN Document</SelectItem>
                  <SelectItem value="business_license">Business License</SelectItem>
                  <SelectItem value="tax_document">Tax Document</SelectItem>
                  <SelectItem value="bank_statement">Bank Statement</SelectItem>
                  <SelectItem value="utility_bill">Utility Bill</SelectItem>
                  <SelectItem value="other">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Ex: florida-certificate-2025"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="file-upload">File</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
          </div>

          <Button 
            onClick={handleFileUpload} 
            disabled={uploading || !selectedFile || !documentType || !documentName}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Company Documents
          </CardTitle>
          <CardDescription>
            {documents.length} document(s) stored for automatic registrations - Ordered by usage priority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Automatic Use Order</span>
            </div>
            <p className="text-sm text-blue-700">
              Documents are automatically used in this order when requested in registrations, verifications or by suppliers/buyers.
            </p>
          </div>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className={`h-4 w-4 ${doc.priority && doc.priority > 0 ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      <span className="text-xs font-medium text-gray-600">#{doc.priority || 0}</span>
                    </div>
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{doc.document_name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                      <Badge variant="outline">
                        {getDocumentTypeLabel(doc.document_type)}
                      </Badge>
                      <span>•</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploaded_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    {doc.usage_instructions && (
                      <div className="text-xs text-blue-600 mt-1 p-2 bg-blue-50 rounded">
                        💡 {doc.usage_instructions}
                      </div>
                    )}
                    {doc.auto_use_for && doc.auto_use_for.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {doc.auto_use_for.map((use) => (
                          <Badge key={use} variant="secondary" className="text-xs">
                            {use.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadDocument(doc)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteDocument(doc)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {documents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No documents found</p>
                <p className="text-sm">Upload company documents for automatic use in registrations</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManager;