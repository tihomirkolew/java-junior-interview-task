import { useUserContext } from "../contexts/UserContext";

export function useUserDelete() {
    const { user, isAuthenticated } = useUserContext();

    const deleteHandler = async (id) => {
        if (!id || isNaN(id)) return;

        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            if (isAuthenticated) {
                const response = await fetch(`http://localhost:8086/api/users/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            }
        } catch (error) {
            alert(error.message);
        }

    }

    return { deleteHandler };
}