import { supabase } from "@/integrations/supabase/client";

export const updateCompanyAuthentificationCode = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('update-company-data', {
      body: {
        ein_number: '33-3939483',
        updates: {
          authentication_code: '25031109351500044504650#1'
        }
      }
    });

    if (error) {
      console.error('Error updating authentication code:', error);
      return { success: false, error };
    }

    console.log('Authentication code updated successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to update authentication code:', error);
    return { success: false, error };
  }
};

// Call the function to update the authentication code
updateCompanyAuthentificationCode();