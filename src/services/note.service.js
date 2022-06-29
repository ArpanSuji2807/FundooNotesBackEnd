import Note from '../models/note.model';

export const AddNote = async (body) => {
    console.log(body);
    const data = await Note.create(body);
    console.log(data);
    return data;
}

export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
}

export const getNote = async (id) => {
    const data = await Note.findById(id);
    return data;
}

export const updateNotes = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
      {
        _id,
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  export const deleteNotes = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
  };