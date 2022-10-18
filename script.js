const table = document.getElementById("listTodo");
let submitBtn = document.getElementById("submitBtn");
let activityInput = document.getElementById("activity");
let descInput = document.getElementById("desc");
let i = 1;
let editMode = false;
let updatedId = "";

const remove = (id) => {
  if (editMode) {
    alert(
      "Maap tidak bisa delete, anda sedang melakukan edit!\nHarap menyelesaikannya terlebih dahulu!"
    );
  } else {
    const value = document.getElementById(id);
    value.remove();
  }
};

const update = (id) => {
  editMode = true;
  submitBtn.innerText = "Ubah";
  updatedId = id;
  const act = document.getElementById(`act-${id}`).innerText;
  const desc = document.getElementById(`desc-${id}`).innerText;

  activityInput.value = act;
  descInput.value = desc;
};

addEventListener("submit", (event) => {
  event.preventDefault();

  if (editMode) {
    const act = document.getElementById(`act-${updatedId}`);
    const desc = document.getElementById(`desc-${updatedId}`);

    act.innerText = activityInput.value;
    desc.innerText = descInput.value;
    submitBtn.innerText = "Tambah";
    editMode = false;
    activityInput.value = "";
    descInput.value = "";
  } else {
    const uuid = Math.random();

    const tableContent = `
              <tr id='${uuid}'>
                  <th scope="row">${i++}</th>
                  <td id='act-${uuid}'>${activityInput.value}</td>
                  <td id='desc-${uuid}'>${descInput.value}</td>
                  <td>
                        <button type="button" class="btn btn-danger" onclick='remove(${uuid})'>
                            Delete
                        </button>
                        <button type="button" class="btn btn-primary" onclick='update(${uuid})'>
                            Update
                        </button>
                  </td>
              </tr>
            `;

    table.innerHTML += tableContent;
    activityInput.value = "";
    descInput.value = "";
  }
});