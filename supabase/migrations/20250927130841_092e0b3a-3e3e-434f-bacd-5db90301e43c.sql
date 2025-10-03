-- Enable Row Level Security on logistics_operations table
ALTER TABLE logistics_operations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for the logistics_operations table
CREATE POLICY "Everyone can view logistics operations" ON logistics_operations
FOR SELECT USING (true);

CREATE POLICY "Everyone can insert logistics operations" ON logistics_operations
FOR INSERT WITH CHECK (true);

CREATE POLICY "Everyone can update logistics operations" ON logistics_operations
FOR UPDATE USING (true);

CREATE POLICY "Everyone can delete logistics operations" ON logistics_operations
FOR DELETE USING (true);