import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  HelpCircle,
  FileText,
  Users,
  Settings,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
  userName: string;
  userEmail: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  responses: Array<{
    id: string;
    message: string;
    isAdmin: boolean;
    timestamp: Date;
  }>;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

export const SupportCenter = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [newResponse, setNewResponse] = useState('');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general' });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock data for tickets and FAQs
      const mockTickets: SupportTicket[] = [
        {
          id: '1',
          title: 'Cannot access course materials',
          description: 'I\'m unable to download the course materials for the React course.',
          status: 'open',
          priority: 'high',
          category: 'Technical',
          userId: 'user1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 3600000),
          responses: [
            {
              id: '1',
              message: 'I\'m experiencing the same issue. Please help!',
              isAdmin: false,
              timestamp: new Date(Date.now() - 3600000)
            }
          ]
        },
        {
          id: '2',
          title: 'Payment processing error',
          description: 'My payment was declined but the amount was charged from my account.',
          status: 'in-progress',
          priority: 'urgent',
          category: 'Payment',
          userId: 'user2',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          assignedTo: 'admin1',
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 7200000),
          responses: [
            {
              id: '2',
              message: 'We are investigating this issue. Please provide your transaction ID.',
              isAdmin: true,
              timestamp: new Date(Date.now() - 7200000)
            }
          ]
        },
        {
          id: '3',
          title: 'Course completion certificate',
          description: 'I completed the course but haven\'t received my certificate.',
          status: 'resolved',
          priority: 'medium',
          category: 'Certificates',
          userId: 'user3',
          userName: 'Mike Johnson',
          userEmail: 'mike@example.com',
          assignedTo: 'admin1',
          createdAt: new Date(Date.now() - 259200000),
          updatedAt: new Date(Date.now() - 86400000),
          responses: [
            {
              id: '3',
              message: 'Certificate has been sent to your email.',
              isAdmin: true,
              timestamp: new Date(Date.now() - 86400000)
            }
          ]
        }
      ];

      const mockFaqs: FAQ[] = [
        {
          id: '1',
          question: 'How do I reset my password?',
          answer: 'Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
          category: 'Account',
          helpful: 45,
          notHelpful: 2
        },
        {
          id: '2',
          question: 'Can I get a refund for a course?',
          answer: 'Yes, we offer a 30-day money-back guarantee. Contact support within 30 days of purchase for a full refund.',
          category: 'Payment',
          helpful: 32,
          notHelpful: 5
        },
        {
          id: '3',
          question: 'How do I download course materials?',
          answer: 'Course materials can be downloaded from the course dashboard. Look for the download button next to each lesson.',
          category: 'Technical',
          helpful: 28,
          notHelpful: 3
        }
      ];

      setTickets(mockTickets);
      setFaqs(mockFaqs);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load support data.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddResponse = async () => {
    if (!selectedTicket || !newResponse.trim()) return;

    try {
      const response = {
        id: Date.now().toString(),
        message: newResponse,
        isAdmin: true,
        timestamp: new Date()
      };

      const updatedTicket = {
        ...selectedTicket,
        responses: [...selectedTicket.responses, response],
        status: 'in-progress' as const,
        updatedAt: new Date()
      };

      setTickets(prev => prev.map(t => t.id === selectedTicket.id ? updatedTicket : t));
      setSelectedTicket(updatedTicket);
      setNewResponse('');
      
      toast({
        title: 'Response Added',
        description: 'Your response has been added to the ticket.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add response.',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, status: SupportTicket['status']) => {
    try {
      setTickets(prev => prev.map(t => 
        t.id === ticketId 
          ? { ...t, status, updatedAt: new Date() }
          : t
      ));
      
      toast({
        title: 'Status Updated',
        description: `Ticket status updated to ${status}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update ticket status.',
        variant: 'destructive'
      });
    }
  };

  const handleCreateFaq = async () => {
    try {
      const newFaqItem: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question,
        answer: newFaq.answer,
        category: newFaq.category,
        helpful: 0,
        notHelpful: 0
      };

      setFaqs(prev => [...prev, newFaqItem]);
      setNewFaq({ question: '', answer: '', category: 'general' });
      setIsFaqDialogOpen(false);
      
      toast({
        title: 'FAQ Created',
        description: 'New FAQ has been added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create FAQ.',
        variant: 'destructive'
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading support center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Support Center</h2>
          <p className="text-muted-foreground">Manage support tickets and FAQs</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New FAQ</DialogTitle>
                <DialogDescription>
                  Create a new frequently asked question.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Question</label>
                  <Input
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                    placeholder="Enter the question"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Answer</label>
                  <Textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                    placeholder="Enter the answer"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newFaq.category} onValueChange={(value) => setNewFaq({...newFaq, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFaqDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFaq}>Create FAQ</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Total Tickets</span>
            </div>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">Open</span>
            </div>
            <p className="text-2xl font-bold">{stats.open}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Resolved</span>
            </div>
            <p className="text-2xl font-bold">{stats.resolved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">Urgent</span>
            </div>
            <p className="text-2xl font-bold">{stats.urgent}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Tickets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{ticket.description}</p>
                          <Badge variant="outline" className="mt-1">{ticket.category}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.userName}</p>
                          <p className="text-sm text-muted-foreground">{ticket.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadgeColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{ticket.createdAt.toLocaleDateString()}</p>
                          <p className="text-muted-foreground">{ticket.createdAt.toLocaleTimeString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setIsTicketDialogOpen(true);
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-2">{faq.answer}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Helpful: {faq.helpful}</span>
                        <span>Not helpful: {faq.notHelpful}</span>
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Mass Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Support Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ticket Detail Dialog */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              {selectedTicket?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Select 
                    value={selectedTicket.status} 
                    onValueChange={(value: any) => handleUpdateTicketStatus(selectedTicket.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <Badge className={getPriorityBadgeColor(selectedTicket.priority)}>
                    {selectedTicket.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p>{selectedTicket.userName} ({selectedTicket.userEmail})</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p>{selectedTicket.createdAt.toLocaleString()}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
              </div>

              {/* Responses */}
              <div>
                <h4 className="font-medium mb-4">Responses</h4>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {selectedTicket.responses.map((response) => (
                    <div key={response.id} className={`p-3 rounded-lg ${
                      response.isAdmin ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {response.isAdmin ? 'Admin' : selectedTicket.userName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {response.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{response.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Response */}
              <div>
                <h4 className="font-medium mb-2">Add Response</h4>
                <Textarea
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder="Type your response..."
                  rows={3}
                />
                <Button 
                  onClick={handleAddResponse} 
                  className="mt-2"
                  disabled={!newResponse.trim()}
                >
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}; 