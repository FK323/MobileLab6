import supabase from "./supabase";

const TABLE_NAME = "sampledatabase"; // Using your actual table name

export async function getTasks() {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");
  if (error) {
    throw error;
  }
  return data;
}

// Add a new task
export async function addTask(task: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ tasks: task }])
    .select();

  if (error) {
    throw error;
  }
  return data;
}

// Update a task
export async function updateTask(id: number, task: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ tasks: task })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }
  return data;
}

// Delete a task
export async function deleteTask(id: number) {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

  if (error) {
    throw error;
  }
  return true;
}
