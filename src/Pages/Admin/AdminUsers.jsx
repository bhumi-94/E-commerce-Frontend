import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserX,
  UserCheck,
  Users,
  UserRoundCheck,
  UserRoundX,
  RefreshCw,
} from "lucide-react";
import {
  fetchAdminUsers,
  dismissUser,
  enableUser,
} from "../../features/Admin/adminSlice";
import Loading from "../../Components/common/Loading";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { users, loading, dismissing, actionLoading, error } = useSelector(
    (state) => state.admin,
  );

  const currentUser = useSelector((state) => state.profile?.user);

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const isActionLoading = actionLoading ?? dismissing ?? false;

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }
    if (image.startsWith("/uploads/")) {
      return `http://localhost:3000${image}`;
    }

    return `http://localhost:3000/uploads/${image}`;
  };

  const handleDismiss = (userId, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to disable ${userName}?`,
    );

    if (!confirmed) {
      return;
    }

    dispatch(dismissUser(userId));
  };

  const handleEnable = (userId, userName) => {
    const confirmed = window.confirm(
      `Do you want to enable ${userName} again?`,
    );

    if (!confirmed) {
      return;
    }

    dispatch(enableUser(userId));
  };
  const handleRefresh = () => {
    dispatch(fetchAdminUsers());
  };
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => Number(user.is_active) === 1,
  ).length;

  const disabledUsers = users.filter(
    (user) => Number(user.is_active) === 0,
  ).length;

  const adminUsers = users.filter((user) => user.role === "admin").length;

  return (
    <div className="min-h-screen bg-[#fcfbf8] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8b3905] text-white">
              <Users size={19} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-wider text-[#8b3905]">
              Administration
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#211d1a] sm:text-3xl">
            User Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all registered Nexora users and account access.
          </p>
        </div>

        {/* REFRESH BUTTON */}

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#e8e1dc] bg-white px-4 py-2.5 text-sm font-semibold text-[#403c39] shadow-sm transition hover:border-[#d8c9be] hover:bg-[#faf8f5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      {!loading && users.length > 0 && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL USERS */}

          <div className="rounded-2xl border border-[#eee7e2] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>

                <p className="mt-2 text-2xl font-bold text-[#211d1a]">
                  {totalUsers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7eee8] text-[#8b3905]">
                <Users size={19} />
              </div>
            </div>
          </div>

          {/* ACTIVE USERS */}

          <div className="rounded-2xl border border-[#eee7e2] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Users
                </p>

                <p className="mt-2 text-2xl font-bold text-[#211d1a]">
                  {activeUsers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <UserRoundCheck size={19} />
              </div>
            </div>
          </div>

          {/* DISABLED USERS */}

          <div className="rounded-2xl border border-[#eee7e2] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Disabled Users
                </p>

                <p className="mt-2 text-2xl font-bold text-[#211d1a]">
                  {disabledUsers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <UserRoundX size={19} />
              </div>
            </div>
          </div>

          {/* ADMIN USERS */}

          <div className="rounded-2xl border border-[#eee7e2] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Administrators
                </p>

                <p className="mt-2 text-2xl font-bold text-[#211d1a]">
                  {adminUsers}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Shield size={19} />
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl border border-[#eee7e2] bg-white py-16">
          <Loading />
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-[#eee7e2] bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f7eee8] text-[#8b3905]">
            <Users size={24} />
          </div>

          <h3 className="font-semibold text-[#211d1a]">No users found</h3>

          <p className="mt-1 text-sm text-gray-500">
            There are currently no registered users.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#eee7e2] bg-white shadow-sm">
          {/* TABLE TOP */}

          <div className="flex flex-col gap-2 border-b border-[#eee7e2] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-[#211d1a]">Registered Users</h2>

              <p className="mt-1 text-xs text-gray-400">
                View and manage user account access.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#f7eee8] px-3 py-1 text-xs font-semibold text-[#8b3905]">
              {users.length} accounts
            </span>
          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px]">
              {/* TABLE HEAD */}

              <thead>
                <tr className="border-b border-[#eee7e2] bg-[#faf8f5] text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Personal Details
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>
                {users.map((user) => {
                  const fullName =
                    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                    "Unknown User";
                  const imageUrl = getImageUrl(user.profile_image);
                  const isActive = Number(user.is_active) === 1;
                  const isCurrentAdmin =
                    Number(user.id) === Number(currentUser?.id);

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-[#f0ebe7] last:border-b-0 transition hover:bg-[#fffaf7]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {/* IMAGE */}

                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={fullName}
                              onError={(event) => {
                                event.currentTarget.style.display = "none";

                                const fallback =
                                  event.currentTarget.nextElementSibling;

                                if (fallback) {
                                  fallback.style.display = "flex";
                                }
                              }}
                              className="h-11 w-11 shrink-0 rounded-full border border-[#eee7e2] object-cover"
                            />
                          ) : null}

                          {/* FALLBACK AVATAR */}

                          <div
                            style={{
                              display: imageUrl ? "none" : "flex",
                            }}
                            className="h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f7eee8] font-bold text-[#8b3905]"
                          >
                            {fullName.charAt(0).toUpperCase()}
                          </div>

                          {/* USER INFO */}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#211d1a]">
                              {fullName}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              ID: #{user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-[#403c39]">
                            <Mail
                              size={15}
                              className="shrink-0 text-gray-400"
                            />

                            <span className="max-w-[220px] truncate">
                              {user.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone
                              size={15}
                              className="shrink-0 text-gray-400"
                            />

                            {user.phone || "Not provided"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[#403c39]">
                            <Calendar size={15} className="text-gray-400" />

                            {user.date_of_birth
                              ? new Date(user.date_of_birth).toLocaleDateString(
                                  "en-IN",
                                )
                              : "Not provided"}
                          </div>

                          <p className="text-gray-500">
                            Gender:{" "}
                            <span className="text-[#403c39]">
                              {user.gender || "Not provided"}
                            </span>
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Shield size={13} />

                          {user.role === "admin" ? "Administrator" : "Customer"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Disabled
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        {/* CURRENT ADMIN */}

                        {isCurrentAdmin ? (
                          <span className="text-xs font-medium text-gray-400">
                            Current account
                          </span>
                        ) : isActive ? (
                          /* DISABLE */

                          <button
                            type="button"
                            onClick={() => handleDismiss(user.id, fullName)}
                            disabled={isActionLoading}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <UserX size={16} />
                            Disable
                          </button>
                        ) : (
                          /* ENABLE */

                          <button
                            type="button"
                            onClick={() => handleEnable(user.id, fullName)}
                            disabled={isActionLoading}
                            className="inline-flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3.5 py-2 text-sm font-semibold text-green-700 transition hover:border-green-200 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <UserCheck size={16} />
                            Enable
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
