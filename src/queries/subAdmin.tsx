import { useMemo } from "react";
import { useProfile } from "./auth";

interface ModulePermission {
  read: boolean;
  write: boolean;
  hasAccess: boolean;
}

const useModulePermissions = (
  moduleName: string | string[]
): ModulePermission => {
  const { data: userData } = useProfile();

  const userPermissions = useMemo(() => {
    if (!userData) {
      return [];
    }

    const findPermission = userData?.permissions?.map(
      (item: { permissions: any }) => item?.permissions
    );
    return findPermission?.[0];
  }, [userData]);

  return useMemo(() => {
    const defaultPermission = { read: false, write: false, hasAccess: false };

    if (!userPermissions || userPermissions.length === 0) {
      return defaultPermission;
    }

    // Handle multiple module names
    if (Array.isArray(moduleName)) {
      const permissions = userPermissions.filter((perm: { modules: string }) =>
        moduleName.includes(perm.modules)
      );

      return {
        read: permissions.some((perm: { read: any }) => perm.read),
        write: permissions.some((perm: { write: any }) => perm.write),
        hasAccess: permissions.length > 0,
      };
    }

    // Single module name
    const modulePermission = userPermissions.find(
      (perm: { modules: string }) => perm.modules === moduleName
    );

    if (!modulePermission) {
      return defaultPermission;
    }

    return {
      read: modulePermission.read,
      write: modulePermission.write,
      hasAccess: true,
    };
  }, [userPermissions, moduleName]);
};

export default useModulePermissions;
