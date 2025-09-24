{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    prisma-utils.url = "github:VanCoding/nix-prisma-utils";
  };

  outputs =
    { nixpkgs, prisma-utils, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      prisma =
        (prisma-utils.lib.prisma-factory {
          inherit pkgs;
          prisma-fmt-hash = "sha256-DN9OkY7nHPvlQfp5QmUzc/Ojze0FWVkGbEKWDZOdbpE=";
          query-engine-hash = "sha256-2K3+O+8kCthlsHQDnProPggIk0bFtYQ3B+nIRcU2Tqw=";
          libquery-engine-hash = "sha256-68ElsODAUuDN7dVBqwaAl9APnRT1ue2nk9On/I2GXbI=";
          schema-engine-hash = "sha256-7ji0Maxygeh8+/O5QM30DXbG8PmwbaqZSLuVDeRyy1Y=";
        }).fromPnpmLock
          ./pnpm-lock.yaml; 
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs
        ];
        env = prisma.env;
      };
    };
}
