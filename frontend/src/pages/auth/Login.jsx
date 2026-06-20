import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import PageContainer from "../../components/common/PageContainer";
import GlassCard from "../../components/common/GlassCard";
import PremiumInput from "../../components/common/PremiumInput";
import GradientButton from "../../components/common/GradientButton";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await authService.login({
          mobileNumber:
            formData.mobileNumber,
          password:
            formData.password,
        });

      const {
        token,
        fullName,
        mobileNumber,
        role,
      } = response.data;

      login(
        {
          fullName,
          mobileNumber,
          role,
        },
        token
      );

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/investor/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                text-5xl
                font-bold
                text-center
                bg-gradient-to-r
                from-[#7C6FFF]
                to-[#00D2B4]
                bg-clip-text
                text-transparent
              "
            >
              DAULAT FINSERV
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
                text-center
                text-slate-400
                mt-3
              "
            >
              INVESTMENT . PROFIT . GROWTH
            </motion.p>

            <div className="mt-8 space-y-5">
              <PremiumInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                value={
                  formData.mobileNumber
                }
                onChange={(e) =>
                  handleChange(
                    "mobileNumber",
                    e.target.value
                  )
                }
              />

              <PremiumInput
                label="Password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  handleChange(
                    "password",
                    e.target.value
                  )
                }
              />

              <GradientButton
                onClick={handleLogin}
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </GradientButton>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Login;