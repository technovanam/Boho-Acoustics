import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  CheckCircle2,
  CircleSlash,
  Download,
  ExternalLink,
  Filter,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  BadgeInfo,
  CalendarRange,
  Clock3,
  FileText,
} from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  contact: string;
  city: string;
  state: string;
  facilityType: string;
  area: string;
  notes: string;
  fileUrl: string;
  fileName: string;
  timestamp: Timestamp | null;
  createdAt?: Timestamp | null;
  processedAt?: Timestamp | null;
  status?: "new" | "processed";
}

const formatDate = (value: Timestamp | Date | string | null | undefined) => {
  if (!value) return "—";
  let date: Date;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    date = value.toDate();
  } else if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string") {
    date = new Date(value);
  } else {
    return "—";
  }
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
};

const normalizeWhatsappNumber = (contact: string) => {
  const digits = contact.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `91${digits.slice(1)}`;
  return digits;
};

const buildWhatsappLink = (contact: string, name: string) => {
  const number = normalizeWhatsappNumber(contact);
  if (!number) return "";
  const message = encodeURIComponent(`Hi ${name}, this is Boho Acoustics. We received your consultation request and wanted to connect regarding your project.`);
  return `https://wa.me/${number}?text=${message}`;
};

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "processed">("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "consultations"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: Consultation[] = [];
      querySnapshot.forEach((snapshot) => {
        docs.push({ id: snapshot.id, ...snapshot.data() } as Consultation);
      });
      setConsultations(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredConsultations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59.999`) : null;

    return consultations.filter((consultation) => {
      const date = consultation.timestamp?.toDate ? consultation.timestamp.toDate() : consultation.createdAt?.toDate ? consultation.createdAt.toDate() : null;
      const matchesSearch =
        !search ||
        [consultation.name, consultation.email, consultation.contact, consultation.city, consultation.state, consultation.facilityType, consultation.notes]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(search));

      const matchesStatus = statusFilter === "all" || (consultation.status || "new") === statusFilter;
      const matchesFrom = !from || (date ? date >= from : true);
      const matchesTo = !to || (date ? date <= to : true);

      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [consultations, searchTerm, statusFilter, fromDate, toDate]);

  const stats = useMemo(() => {
    const total = consultations.length;
    const processed = consultations.filter((item) => (item.status || "new") === "processed").length;
    const newCount = total - processed;
    return { total, processed, newCount };
  }, [consultations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("LOGIN DETECTED. AUTHORIZED.");
    } catch {
      toast.error("UNAUTHORIZED: INVALID CREDENTIALS.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast("SESSION TERMINATED.");
  };

  const handleMarkProcessed = async (consultationId: string) => {
    setUpdatingId(consultationId);
    try {
      await updateDoc(doc(db, "consultations", consultationId), {
        status: "processed",
        processedAt: serverTimestamp(),
      });
      toast.success("MARKED AS PROCESSED.");
    } catch (error) {
      console.error(error);
      toast.error("FAILED TO UPDATE STATUS.");
    } finally {
      setUpdatingId(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setFromDate("");
    setToDate("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primary font-bold tracking-widest text-xs uppercase">
        INITIALIZING SYSTEM...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md border border-white/10 bg-black p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />

          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-[1px] bg-primary" />
            <h1 className="text-white text-[10px] tracking-[0.4em] uppercase font-bold">ADMIN PORTAL</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-3 block">ACCESS ID (EMAIL)</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white uppercase text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-3 block">SECURITY KEY (PASSWORD)</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white text-xs tracking-widest focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all"
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-none gradient-gold text-primary-foreground font-black text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
              AUTHENTICATE
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold">CONTROL CENTER</p>
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight">Diagnostic Intake Dashboard</h2>
              <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
                Manage new consultation requests, filter by date, update processing status, and open direct WhatsApp follow-ups from one place.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <Button onClick={handleLogout} variant="outline" className="border-white/10 rounded-none hover:bg-white/5 hover:text-white h-10 tracking-widest text-[10px] uppercase font-bold">
              <LogOut className="w-3 h-3 mr-2" /> DISCONNECT
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="border border-white/10 bg-white/[0.02] p-5 lg:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 font-bold mb-3 flex items-center gap-2">
              <BadgeInfo className="w-3 h-3 text-primary" /> Total Requests
            </p>
            <p className="text-3xl font-display font-black text-white">{stats.total}</p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-5 lg:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 font-bold mb-3 flex items-center gap-2">
              <Clock3 className="w-3 h-3 text-primary" /> New Requests
            </p>
            <p className="text-3xl font-display font-black text-white">{stats.newCount}</p>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-5 lg:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-primary" /> Processed
            </p>
            <p className="text-3xl font-display font-black text-white">{stats.processed}</p>
          </div>
        </section>

        <section className="border border-white/10 bg-black p-4 sm:p-5 lg:p-6 space-y-4">
          <div className="flex items-center gap-3 text-primary uppercase text-[10px] tracking-[0.3em] font-bold">
            <Filter className="w-3 h-3" /> Filters
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-white/45 font-bold mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, phone, city, state, notes..."
                  className="pl-10 bg-white/[0.02] border-white/10 rounded-none h-12 text-white placeholder:text-white/25 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/45 font-bold mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as "all" | "new" | "processed")}>
                <SelectTrigger className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-none text-white uppercase text-xs tracking-widest focus:ring-1 focus:ring-primary focus:border-primary">
                  <SlidersHorizontal className="w-4 h-4 text-white/30 mr-2" />
                  <SelectValue placeholder="ALL" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-white/10 rounded-none text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                  <SelectItem value="all" className="uppercase tracking-widest text-xs focus:bg-white/5 focus:text-primary rounded-none">
                    All
                  </SelectItem>
                  <SelectItem value="new" className="uppercase tracking-widest text-xs focus:bg-white/5 focus:text-primary rounded-none">
                    New
                  </SelectItem>
                  <SelectItem value="processed" className="uppercase tracking-widest text-xs focus:bg-white/5 focus:text-primary rounded-none">
                    Processed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={clearFilters} className="w-full h-12 rounded-none border-white/10 uppercase tracking-widest text-[10px] font-bold hover:bg-white/5 hover:text-white">
                <CircleSlash className="w-3 h-3 mr-2" /> Clear Filters
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/45 font-bold mb-2 block flex items-center gap-2">
                <CalendarRange className="w-3 h-3 text-primary" /> From Date
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/45 font-bold mb-2 block flex items-center gap-2">
                <CalendarRange className="w-3 h-3 text-primary" /> To Date
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-white/[0.02] border-white/10 rounded-none h-12 text-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>
          </div>
        </section>

        {filteredConsultations.length === 0 ? (
          <div className="text-center py-24 border border-white/5 bg-white/[0.01]">
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">NO DIAGNOSTIC LOGS MATCH THE CURRENT FILTERS.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:gap-6">
            {filteredConsultations.map((req, index) => {
              const whatsappHref = buildWhatsappLink(req.contact, req.name);
              const status = req.status || "new";
              const isProcessed = status === "processed";

              return (
                <article key={req.id} className="border border-white/10 bg-black p-5 sm:p-6 lg:p-7 transition-all hover:border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 group-hover:bg-primary transition-colors" />

                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
                    <div className="flex-1 space-y-5">
                      <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[10px] font-black text-white/20 tracking-widest">#{index + 1}</span>
                          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">{req.name}</h3>
                          <span className={`text-[9px] px-2 py-1 border uppercase tracking-widest ${isProcessed ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20" : "bg-primary/10 text-primary border-primary/20"}`}>
                            {status}
                          </span>
                        </div>
                        <div className="text-[9px] px-2 py-1 bg-white/5 text-white/40 border border-white/10 uppercase tracking-widest w-fit">
                          {formatDate(req.timestamp || req.createdAt)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
                        <div className="border border-white/5 bg-white/[0.01] p-4">
                          <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2 flex items-center gap-2">
                            <Mail className="w-3 h-3" /> Email
                          </p>
                          <a href={`mailto:${req.email}`} className="text-xs sm:text-sm font-medium text-white/85 hover:text-primary transition-colors break-all">
                            {req.email || "N/A"}
                          </a>
                        </div>
                        <div className="border border-white/5 bg-white/[0.01] p-4">
                          <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2 flex items-center gap-2">
                            <Phone className="w-3 h-3" /> Contact
                          </p>
                          {whatsappHref ? (
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-white/85 hover:text-primary transition-colors break-all inline-flex items-center gap-2">
                              {req.contact || "N/A"}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <p className="text-xs sm:text-sm font-medium text-white/85 break-all">{req.contact || "N/A"}</p>
                          )}
                        </div>
                        <div className="border border-white/5 bg-white/[0.01] p-4">
                          <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2 flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Location
                          </p>
                          <p className="text-xs sm:text-sm uppercase tracking-wide text-white/80">{req.city}, {req.state}</p>
                        </div>
                        <div className="border border-white/5 bg-white/[0.01] p-4">
                          <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2">Facility / Area</p>
                          <p className="text-xs sm:text-sm uppercase tracking-wide text-white/80">{req.facilityType || "N/A"}</p>
                          <p className="text-xs sm:text-sm uppercase tracking-wide text-white/50 mt-1">{req.area || "N/A"} SQ FT</p>
                        </div>
                      </div>

                      {req.notes && (
                        <div className="pt-4 border-t border-white/5">
                          <p className="text-[9px] text-primary tracking-widest uppercase font-bold mb-2">Diagnostic Notes</p>
                          <p className="text-sm font-light leading-relaxed text-white/65 whitespace-pre-wrap">{req.notes}</p>
                        </div>
                      )}
                    </div>

                    <aside className="xl:w-80 xl:border-l xl:border-white/10 xl:pl-8 flex flex-col gap-4">
                      {req.fileUrl ? (
                        <div className="space-y-3 border border-white/5 bg-white/[0.01] p-4">
                          <p className="text-[8px] text-white/35 uppercase tracking-widest truncate flex items-center gap-2">
                            <FileText className="w-3 h-3 text-primary" />
                            {req.fileName || "ATTACHED FILE"}
                          </p>
                          <a href={req.fileUrl} download={req.fileName || "attachment"} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button className="w-full h-12 rounded-none bg-white/5 border border-white/10 text-white font-bold text-[10px] tracking-widest hover:bg-white/10 transition-colors uppercase">
                              <Download className="w-3 h-3 mr-2 text-primary" /> VIEW / DOWNLOAD FILE
                            </Button>
                          </a>
                        </div>
                      ) : (
                        <div className="w-full min-h-12 flex items-center justify-center border border-dashed border-white/10 text-[9px] text-white/30 font-bold uppercase tracking-widest px-4 py-3">
                          NO ATTACHMENT
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                        <Button
                          onClick={() => handleMarkProcessed(req.id)}
                          disabled={isProcessed || updatingId === req.id}
                          className={`w-full h-12 rounded-none border text-[10px] tracking-widest uppercase font-bold transition-colors ${isProcessed ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/10" : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white bg-transparent"}`}
                          variant="outline"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-2" />
                          {isProcessed ? "PROCESSED" : updatingId === req.id ? "UPDATING..." : "MARK PROCESSED"}
                        </Button>
                        {whatsappHref ? (
                          <Button asChild className="w-full h-12 rounded-none gradient-gold text-primary-foreground font-black text-[10px] tracking-widest uppercase hover:opacity-90">
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                              WHATSAPP CLIENT
                            </a>
                          </Button>
                        ) : (
                          <Button disabled className="w-full h-12 rounded-none text-[10px] tracking-widest uppercase font-black">
                            NO WHATSAPP NUMBER
                          </Button>
                        )}
                      </div>
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
