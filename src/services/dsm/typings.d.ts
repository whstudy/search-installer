declare namespace API {
  type APIError = {
    error_code: number;
    message: string;
  };

  type ClusterConfiguration = {
    cluster?: {
      deploy_mode?: { nas: boolean; object: boolean };
      nas?: { is_bcache_enabled: boolean };
      network?: {
        ntp?: {
          external_servers?: string[];
          internal_server: string;
          network_plane: string;
          synchronized_date_time_offset: number;
          synchronized_timezone: string;
        };
      };
      object?: { is_cache_enabled: boolean };
      vhost_number: number;
    };
    /** List of node information */
    nodes?: {
      bmc: string;
      cpu_core: number;
      hdd_count: number;
      hostname: string;
      ip: string;
      nic_count: number;
      product_name: string;
      rack_name: string;
      roles: string[];
      serial_number: string;
      ssd_count: number;
      total_capacity: string;
      total_memory_capacity: string;
    }[];
  };

  type NetworkConfiguration = {
    dns: {
      external_dns_servers: { primary?: string; secondary?: string[] };
      internal_dns_server?: string;
    };
    network_plane: {
      backend: { subnets?: Subnet[] };
      frontend: { subnets?: Subnet[] };
      mgmt: { subnets?: Subnet[] };
    };
  };

  type Subnet = {
    /** IPv4 gateway address */
    ipv4_gateway: string;
    /** IPv4 network address and subnet mask */
    ipv4_network: string;
    /** IPv6 gateway address */
    ipv6_gateway?: string;
    /** IPv6 network address and subnet mask */
    ipv6_network?: string;
    /** Name of the subnet */
    name: string;
    zones: Zone[];
  };

  type Zone = {
    /** Floating IPv4 address pool */
    floating_ipv4_pool?: string;
    /** Floating IPv6 address pool */
    floating_ipv6_pool?: string;
    /** Name of the zone */
    name: string;
    /** NAS domain name */
    nas_domain_name?: string;
    /** NAS floating IPv4 address pool */
    nas_floating_ipv4_pool?: string;
    /** NAS floating IPv6 address pool */
    nas_floating_ipv6_pool?: string;
    /** Object domain name */
    object_domain_name?: string;
    /** Object floating IPv4 address pool */
    object_floating_ipv4_pool?: string;
    /** Object floating IPv6 address pool */
    object_floating_ipv6_pool?: string;
    /** Static IPv4 address pool */
    static_ipv4_pool?: string;
    /** Static IPv6 address pool */
    static_ipv6_pool?: string;
  };
}
